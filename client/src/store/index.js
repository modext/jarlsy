import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { tableHeaderSortingReducer } from "./tableHeaderSortingReducer";
import { modal } from "./modal";
import { userAuthentication } from "./userAuth";
import thunk from "redux-thunk";
import { filteredDataReducer } from "./filteredData";
import { addToBag } from "./addToBag";
import likedProdReducer from "./likedProductRed";
import NavReducer from "./navData";
import { productsStore } from "./productStore";
import { ordersStore } from "./orderStore";
import { transactionsStore } from "./transactionsStore";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    tableHeaderSorting: tableHeaderSortingReducer,
    modal,
    user: userAuthentication,
    products: productsStore,
    orders: ordersStore,
    transaction: transactionsStore,
    filteredData: filteredDataReducer,
    addToBag: addToBag,
    likedProducts: likedProdReducer,
    navData: NavReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
