function likedProdReducer(likedProducts = [], action) {
  if (action.type === "ADD_LIKED") {
    return [...likedProducts, action.payload];
  }
  if (action.type === "REMOVE_LIKED") {
    return likedProducts.filter((prod) => prod.id !== action.payload.id);
  }
  return likedProducts;
}

export default likedProdReducer;
