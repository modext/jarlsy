import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function ordersStore(state = { orders: [], message: "" }, action) {
  if (action.type === "GET_ORDER") {
    return { ...state, message: "", orders: [...action.payload] };
  }
  if (action.type === "UPDATE_ORDER") {
    return { ...state, message: "", orders: [...action.payload] };
  }
  if (action.type === "ORDER_ERROR") {
    return { ...state, orders: [], message: action.payload };
  }
  if (action.type === "RESET_ORDER") {
    return { products: [], message: "RESET" };
  }
  return state;
}

const updateOrder = (elem) => {
  return { type: "UPDATE_ORDER", payload: elem };
};
const resetOrder = () => {
  return { type: "RESET_ORDER" };
};

const getOrderData = (id) => {
  return async (dispatch) => {
    try {
      const ordersCollection = await getDocs(
        collection(db, "users", id, "incomingOrders")
      );
      if (ordersCollection.size === 0) {
        dispatch({
          type: "ORDER_ERROR",
          payload: "No Orders found"
        });
        return;
      }
      let promisesProd = [];
      ordersCollection.forEach((document) => {
        promisesProd.push(
          getDoc(doc(db, "users", id, "products", document.id))
        );
      });
      let fulfilledProd = await Promise.all(promisesProd);
      let ordersArr = [];
      ordersCollection.docs.forEach((document, idx) => {
        ordersArr.push({
          ...document.data(),
          id: document.id,
          prize: document.data().qty * fulfilledProd[idx].data().prize,
          details: fulfilledProd[idx].data()
        });
      });
      ordersArr = ordersArr.sort((a, b) => {
        return b.timestamp.seconds - a.timestamp.seconds;
      });
      dispatch({ type: "GET_ORDER", payload: ordersArr });
    } catch (err) {
      dispatch({ type: "ORDER_ERROR", payload: err.message });
    }
  };
};

export { getOrderData, resetOrder, ordersStore, updateOrder };
