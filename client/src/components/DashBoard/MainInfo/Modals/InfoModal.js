import React from "react";
import { IoClose } from "react-icons/io5";

import OrderModal from "./OrderModal";
import ProductModal from "./ProductModal";

function InfoModal({ modalDta, notifyParent, type, user, editMode }) {
  function convertDate(sec) {
    let date = new Date(sec * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1 > 9
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    }/${date.getFullYear()}`;
  }

  return (
    <div
      className={` bg-white flex flex-col justify-between ${
        type === "Products" ? "p-4" : "px-4 py-3"
      }  rounded-md shadow-sm_dark  h-full relative`}
    >
      <div
        onClick={notifyParent}
        className="absolute cursor-pointer right-2 top-2"
      >
        <IoClose></IoClose>
      </div>
      {type === "Products" ? (
        <ProductModal
          user={user}
          editMode={editMode}
          convertDate={convertDate}
          modalDta={modalDta}
        ></ProductModal>
      ) : (
        <OrderModal
          editMode={modalDta.status === "Delivered" ? null : editMode}
          notifyParent={notifyParent}
          modalDta={modalDta}
          convertDate={convertDate}
        ></OrderModal>
      )}
    </div>
  );
}

export default InfoModal;
