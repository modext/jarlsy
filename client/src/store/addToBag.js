function addToBag(bag = [], action) {
  if (action.type === "ADD") {
    return [
      ...bag,
      {
        ...action.payload.data,
        qty: action.payload.qty,
        sizeSelected: action.payload.size
      }
    ];
  }
  if (action.type === "UPDATE") {
    let updatedBag = bag.map((prod) => {
      if (prod.id === action.payload.data.id) {
        return {
          ...action.payload.data,
          qty: action.payload.qty,
          sizeSelected: action.payload.size
        };
      }
      return { ...prod };
    });
    return updatedBag;
  }
  if (action.type === "REMOVE") {
    let filtered = bag.filter((prod) => prod.id !== action.payload.id);
    return filtered;
  }
  return bag;
}
function add(payload, qty, size) {
  return {
    type: "ADD",
    payload: {
      data: payload,
      qty,
      size
    }
  };
}
function update(payload, qty, size) {
  return {
    type: "UPDATE",
    payload: {
      data: payload,
      qty,
      size
    }
  };
}
function remove(payload) {
  return { type: "REMOVE", payload };
}

export { addToBag, add, update, remove };
