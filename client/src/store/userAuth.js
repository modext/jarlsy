const USER_IN = "USER_IN";
const USER_OUT = "USER_OUT";

function userAuthentication(state = { user: null }, action) {
  if (action.type === USER_IN) {
    return { user: action.payload };
  }
  if (action.type === USER_OUT) {
    return { user: null };
  }
  return state;
}

function logInUser(data) {
  return { type: USER_IN, payload: data };
}

function logOutUser() {
  return { type: USER_OUT };
}

export { logInUser, logOutUser, userAuthentication };
