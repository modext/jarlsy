function tableHeaderSortingReducer(
  state = {
    sortElemName: "",
    order: "",
    modifiedArr: []
  },
  action
) {
  if (action.type === "SORT") {
    console.log(action.payload);
    const [sortElemName, order] = action.payload;
    return { ...state, sortElemName, order };
  }
  if (action.type === "PRICE") {
    let sortedProducts = [...action.elements].sort((a, b) => {
      return state.order === "asc" ? a.prize - b.prize : b.prize - a.prize;
    });
    return { ...state, modifiedArr: sortedProducts };
  }
  if (action.type === "STOCK") {
    let sortedProducts = [...action.elements].sort((a, b) => {
      return state.order === "asc"
        ? Number(a.inStock) - Number(b.inStock)
        : Number(b.inStock) - Number(a.inStock);
    });
    return { ...state, modifiedArr: sortedProducts };
  }
  if (action.type === "SOLD") {
    let sortedProducts = [...action.elements].sort((a, b) => {
      return state.order === "asc"
        ? Number(a.adminInfo.sold) - Number(b.adminInfo.sold)
        : Number(b.adminInfo.sold) - Number(a.adminInfo.sold);
    });
    return { ...state, modifiedArr: sortedProducts };
  }
  if (action.type === "REVENUE") {
    let sortedProducts = [...action.elements].sort((a, b) => {
      return state.order === "asc"
        ? Number(a.adminInfo.revenue) - Number(b.adminInfo.revenue)
        : Number(b.adminInfo.revenue) - Number(a.adminInfo.revenue);
    });
    return { ...state, modifiedArr: sortedProducts };
  }

  if (action.type === "DATE") {
    let sortedProducts = [...action.elements].sort((a, b) => {
      if (a.createdAt) {
        return state.order === "asc"
          ? a.createdAt.seconds - b.createdAt.seconds
          : b.createdAt.seconds - a.createdAt.seconds;
      } else {
        return state.order === "asc"
          ? a.timestamp.seconds - b.timestamp.seconds
          : b.timestamp.seconds - a.timestamp.seconds;
      }
    });
    return { ...state, modifiedArr: sortedProducts };
  }
  if (action.type === "RESET_TABLE") {
    return { sortElemName: "", order: "", modifiedArr: [] };
  }
  return state;
}

const sortBy = (...element) => {
  return { type: "SORT", payload: element };
};
const sortByType = (elements, type) => {
  return { type, elements };
};

function resettableHeader() {
  return { type: "RESET_TABLE" };
}
function reset() {}
export {
  tableHeaderSortingReducer,
  resettableHeader,
  reset,
  sortBy,
  sortByType
};
