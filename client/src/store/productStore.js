import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function productsStore(state = { products: [], message: "" }, action) {
  if (action.type === "GET_PRODUCT") {
    return { ...state, message: "", products: [...action.payload] };
  }
  if (action.type === "UPDATE_PRODUCT") {
    return { ...state, message: "", products: [...action.payload] };
  }
  if (action.type === "PROD_ERROR") {
    return { ...state, products: [], message: action.payload };
  }
  if (action.type === "RESET_PROD") {
    return { products: [], message: "RESET" };
  }
  return state;
}

const updateProduct = (elem) => {
  return { type: "UPDATE_PRODUCT", payload: elem };
};
const resetProducts = () => {
  return { type: "RESET_PROD" };
};

const getProductsData = (id) => {
  return async (dispatch) => {
    try {
      const adminInfoCollection = await getDocs(
        collection(db, "users", id, "productsAdminInfo")
      );
      const productsCollection = await getDocs(
        collection(db, "users", id, "products")
      );
      if (productsCollection.size === 0) {
        dispatch({
          type: "PROD_ERROR",
          payload: "No Products found"
        });
        return;
      }
      let productsArr = [];
      productsCollection.docs.forEach((document, idx) => {
        productsArr.push({
          ...document.data(),
          id: document.id,
          adminInfo: {
            ...adminInfoCollection.docs[idx].data(),
            adminInfId: adminInfoCollection.docs[idx].data()
          }
        });
      });

      dispatch({ type: "GET_PRODUCT", payload: productsArr });
    } catch (err) {
      dispatch({ type: "PROD_ERROR", payload: err.message });
    }
  };
};

export { getProductsData, resetProducts, productsStore, updateProduct };
