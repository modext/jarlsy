import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PaginationBtns({ navigate, backBtn, currPage, forwardDisable }) {
  return (
    <div className="flex absolute right-3 bottom-3  items-center justify-end cursor-pointer">
      <button
        disabled={backBtn}
        onClick={() => {
          navigate("back");
        }}
        className={`w-8 ${
          backBtn ? "bg-gray-100" : ""
        } hover:bg-gray-100 transition-all duration-150 flex items-center justify-center h-8 p-2 border-2  rounded-sm `}
      >
        <IoIosArrowBack></IoIosArrowBack>
      </button>
      <div className="border-t-2  border-b-2 flex items-center justify-center font-regular p-2 w-8 h-8 text-xs">
        {currPage}
      </div>
      <button
        disabled={forwardDisable}
        onClick={() => {
          navigate("forward");
        }}
        className={` p-2 w-8 flex hover:bg-gray-100 ${
          forwardDisable ? "bg-gray-100" : ""
        } transition-all duration-150 items-center justify-center h-8 border-2  rounded-sm `}
      >
        <IoIosArrowForward className="w-5 h-5"></IoIosArrowForward>
      </button>
    </div>
  );
}

export default PaginationBtns;
