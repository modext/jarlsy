function NavReducer(state = { messages: 0, notifications: 0 }, action) {
  if (action.type === "MESSAGE_UPDATED") {
    return { ...state, messages: action.payload };
  }
  if (action.payload === "NOTIFICATION_UPDATED") {
    return { ...state, notifications: action.payload };
  }
  return state;
}

export default NavReducer;
