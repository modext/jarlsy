import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import OrderItem from "./OrderItem";

function WrapperOrders({ order }) {
  const [itemsOrdered, setitemsOrdered] = useState([]);
  useEffect(() => {
    async function getIndOrderedItem() {
      try {
        let collectedPromises = [];
        order.orderedItems.forEach((item) => {
          collectedPromises.push(
            getDoc(doc(db, "users", item.adId, "products", item.prId))
          );
        });
        let fulfilled = await Promise.all(collectedPromises);
        let docsData = fulfilled.map((doc, idx) => {
          return {
            orderedQty: order.orderedItems[idx].qt,
            orderStatus: order.orderedItems[idx].orderStatus,
            userOrderedName: order.orderedItems[idx].nm,
            id: doc.id,
            ...doc.data()
          };
        });
        setitemsOrdered(docsData);
      } catch (err) {}
    }
    getIndOrderedItem();
  }, [order]);

  return (
    <div className=" bg-[#f5f5f550] rounded-md shadow-sm_dark p-7">
      {itemsOrdered.map((item) => {
        return <OrderItem item={item}></OrderItem>;
      })}
      <div className="text-right mt-7">
        <div className="inline-block">
          <div className="text-sm pb-1 w-48 text-[#777777]  justify-between flex space-x-1.5">
            <div className="">Ordered Amount</div>
            <div className="">
              $
              {(order.reciept.amount - order.reciept.amount_shipping).toFixed(
                2
              )}
            </div>
          </div>
          <div className="text-sm pb-2 border-[#e0e0e0] border-b-[1.7px] w-48 text-[#777777]  justify-between flex space-x-1.5">
            <div>Shipping</div>
            <div>${order.reciept.amount_shipping}</div>
          </div>
          <div className="text-sm  font-medium pt-2 w-48 text-[#000000] justify-between flex space-x-1.5">
            <div>Total</div>
            <div>${order.reciept.amount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WrapperOrders;
