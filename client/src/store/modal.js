const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

function modal(state = { modal: false, admin: false }, action) {
  if (action.type === OPEN_MODAL) {
    return { ...state, modal: true, admin: action.payload };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, modal: false };
  }
  return state;
}

function openModal(data) {
  return { type: OPEN_MODAL, payload: data };
}

function closeModal() {
  return { type: CLOSE_MODAL };
}

export { openModal, closeModal, modal };
