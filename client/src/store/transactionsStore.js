import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function transactionsStore(state = { transaction: [], message: "" }, action) {
  if (action.type === "GET_TRANSACTION") {
    return { ...state, message: "", transaction: [...action.payload] };
  }
  if (action.type === "UPDATE_TRANSACTION") {
    return { ...state, message: "", transaction: [...action.payload] };
  }
  if (action.type === "TRANSACTION_ERROR") {
    return { ...state, transaction: [], message: action.payload };
  }
  if (action.type === "RESET_TRANSACTION") {
    return { products: [], message: "RESET" };
  }
  return state;
}

const updateTransaction = (elem) => {
  return { type: "UPDATE_TRANSACTION", payload: elem };
};
const resetTransaction = () => {
  return { type: "RESET_TRANSACTION" };
};

const getTransactionData = (id) => {
  return async (dispatch) => {
    try {
      const ordersCollection = await getDocs(
        collection(db, "users", id, "incomingOrders")
      );
      if (ordersCollection.size === 0) {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: "No transactions found"
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

      dispatch({ type: "GET_TRANSACTION", payload: ordersArr });
    } catch (err) {
      dispatch({ type: "TRANSACTION_ERROR", payload: err.message });
    }
  };
};

export {
  getTransactionData,
  resetTransaction,
  transactionsStore,
  updateTransaction
};
