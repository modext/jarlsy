import express from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import cors from 'cors';
dotenv.config();
// firebase connect from backend to frontend
import { serviceAccount } from './permissions.js';
const app = express();
app.use(
  cors({
    origin: '*',
  })
);

const initApp = !admin.getApps().length
  ? admin.initializeApp({
      credential: admin.cert(serviceAccount),
    })
  : admin.getApp();

const db = getFirestore();
const stripePay = stripe(
  'sk_test_51KahDwSD9jCLwCZ0c23mbxcfJEl22zhZEw6YbKMWfMiGzSXHvqpzWiwBxluuBmPKwNyqM3AqgyTiECs14idAg2EI00hnGEVv5V'
);
app.get('/', (req, res) => {
  res.send('Started');
});
app.post('/api/create-checkout-session', express.json(), async (req, res) => {
  console.log('data');
  const { items, docId, email, name } = req.body;
  try {
    const transformItems = items.map((item) => {
      return {
        description: item.description.slice(0, 33),
        quantity: item.qty,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.prize * 1) * 100,
          product_data: {
            name: item.title,
            images: [item.productImg[0]],
          },
        },
      };
    });

    const session = await stripePay.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_rates: ['shr_1KaiH8SD9jCLwCZ02Y4YC968'],
      line_items: transformItems,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA'],
      },
      mode: 'payment',
      success_url: `https://brance-dev.web.app/success`,
      cancel_url: `https://brance-dev.web.app/checkout`,
      metadata: {
        docId,
        itemOwnerIds: JSON.stringify(
          items.map((item) => ({
            adId: item.adminId,
            prId: item.id,
            qt: item.qty,
            nm: name.trim(),
          }))
        ),
        email,
      },
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.log(err);
  }
});

function postToIndCollection(
  ownerId,
  docId,
  qty,
  name,
  { shipping, metadata, id, payment_status }
) {
  return db
    .collection('users')
    .doc(ownerId)
    .collection('incomingOrders')
    .doc(docId)
    .set({
      shipping: { ...shipping.address },
      qty,
      itemId: docId,
      email: metadata.email,
      name,
      payment_status: payment_status,
      correspondingSession: id,
      userOrderedId: metadata.docId,
      status: 'Pending',
      timestamp: new Date(),
    });
}

async function postOrderToDb(session) {
  let promises = [];
  JSON.parse(session.metadata.itemOwnerIds).forEach((item) => {
    console.log(item.adId, item.prId, item.qt, item.nm);
    promises.push(
      postToIndCollection(item.adId, item.prId, item.qt, item.nm, session)
    );
  });
  try {
    await Promise.all(promises);
    console.log('order done 1');
  } catch (err) {
    throw new Error(err.message);
  }

  return db
    .collection('users')
    .doc(session.metadata.docId)
    .collection('orders')
    .doc(session.id)
    .set({
      reciept: {
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        payment: session.payment_status,
      },
      email: session.metadata.email,
      orderedItems: JSON.parse(session.metadata.itemOwnerIds).map((el) => ({
        ...el,
        orderStatus: 'Pending',
      })),
      timestamp: new Date(),
    })
    .then(() => {
      console.log('order done');
    });
}

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sign = req.headers['stripe-signature'];
    let event;
    // event posted comes from stripe
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sign,
        `whsec_rp6OeZnRlI2ULcJ6Xh0VpRG7MJSxwjn1`
      );
    } catch (err) {
      return res.status(400).send(`Webhook err : ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      return postOrderToDb(session)
        .then((res) => {
          res.status(200).end();
        })
        .catch((err) => {
          res.status(400).send(`Webhook err : ${err.message}`);
        });
    }
  }
);

app.listen(process.env.PORT || 5000, () => {
  console.log('server');
});
