function filteredDataReducer(state = [], action) {
  if (action.type === "CATEGORY_FILTER") {
    const filteredData = action.payload.elementsArr.filter((product) => {
      if (action.payload.typeDta === "orders") {
        return product.details.category === action.payload.type;
      }
      return product.category === action.payload.type;
    });
    return [...filteredData];
  }
  if (action.type === "CATEGORY_STATUS") {
    const filteredData = action.payload.elementsArr.filter((el) => {
      return el.status === action.payload.type;
    });
    return [...filteredData];
  }
  if (action.type === "CATEGORY_DATE") {
    const filteredData = action.payload.elementsArr.filter((product) => {
      let d1 =
        action.payload.typeDta === "orders"
          ? new Date(product.timestamp.seconds * 1000)
          : new Date(product.createdAt.seconds * 1000);
      let d2 = action.payload.start;
      let d3 = action.payload.end;
      return d2.toDateString() !== d3.toDateString()
        ? d1 >= d2 && (d1 <= d3 || d1.toDateString() === d3.toDateString())
        : d1.toDateString() === d2.toDateString();
    });
    return [...filteredData];
  }
  if (action.type === "RESET_FILTER") {
    return {};
  }
  return state;
}
const filterCategory = (data) => {
  return { type: "CATEGORY_FILTER", payload: data };
};
const filterDate = (data) => {
  return { type: "CATEGORY_DATE", payload: data };
};
const filterStatus = (data) => {
  return { type: "CATEGORY_STATUS", payload: data };
};
const resetFilter = () => {
  return { type: "RESET_FILTER" };
};

export {
  filterCategory,
  filterStatus,
  resetFilter,
  filterDate,
  filteredDataReducer
};
