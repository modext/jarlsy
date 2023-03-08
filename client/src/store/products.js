// import { collection, getDocs, getDoc, doc } from "firebase/firestore";
// import { db } from "../services/firebase";

// function products(state = { products: [], message: "" }, action) {
//   if (action.type === "GET_DATA") {
//     return { ...state, message: action.param, products: [...action.payload] };
//   }
//   if (action.type === "UPDATE_PRODUCT") {
//     return { ...state, products: [...action.payload] };
//   }
//   if (action.type === "ERROR") {
//     return { ...state, products: [], message: action.payload };
//   }
//   if (action.type === "RESET_PROD") {
//     return { products: [], message: "RESET" };
//   }
//   return state;
// }

// const updateProduct = (elem) => {
//   return { type: "UPDATE_PRODUCT", payload: elem };
// };

// const getProductsData = (id, sub) => {
//   return async (dispatch) => {
//     try {
//       const subCollectionRef = await collection(db, "users", id, sub);
//       const docsSnap = await getDocs(subCollectionRef);
//       let docs;
//       if (sub !== "incomingOrders") {
//         const subCollectionRefTwo = await collection(
//           db,
//           "users",
//           id,
//           "productsAdminInfo"
//         );
//         const docsSnapTwo = await getDocs(subCollectionRefTwo);
//         console.log(docsSnapTwo, docsSnap);
//         docs = docsSnap.docs.map((document, idx) => ({
//           id: document.id,
//           ...document.data(),
//           adminInfo: {
//             ...docsSnapTwo.docs[idx].data(),
//             adminInfId: docsSnapTwo.docs[idx].id
//           }
//         }));
//       } else {
//         let promises = [];
//         docsSnap.forEach((docu) => {
//           promises.push(getDoc(doc(db, "users", id, "products", docu.id)));
//         });
//         let fullfiled = await Promise.all(promises);
//         docs = docsSnap.docs
//           .map((doc, idx) => {
//             return {
//               ...doc.data(),
//               id: doc.id,
//               prize: doc.data().qty * fullfiled[idx].data().prize,
//               details: fullfiled[idx].data()
//             };
//           })
//           .sort((a, b) => {
//             return b.timestamp.seconds - a.timestamp.seconds;
//           });
//       }
//       console.log(docs);
//       dispatch({ type: "GET_DATA", payload: { docs, message: sub } });
//     } catch (err) {
//       dispatch({ type: "ERROR", payload: err.message });
//     }
//   };
// };
// getProductsData();
// const resetProducts = () => {
//   return { type: "RESET_PROD" };
// };

// export { getProductsData, resetProducts, products, updateProduct };
