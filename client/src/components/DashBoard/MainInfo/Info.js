import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

function Info({
  type,
  setDelete = null,
  setEditPhase = null,
  setViewPhase = null
}) {
  const [info, showInfo] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <BsThreeDots
        className={`z-20  relative ${
          type === "User Reply" ? "w-4 h-4" : "w-6 h-6"
        }`}
        onClick={() => {
          showInfo((prev) => {
            return !prev;
          });
        }}
      ></BsThreeDots>
      {info && (
        <div
          className={` z-50 absolute   font-semibold overflow-hidden ${
            type === "User Reply" ? "text-xs top-3" : "text-sm top-4"
          } shadow-sm_dark rounded-md right-0 w-32 bg-white`}
        >
          {type !== "User Reply" && (
            <div
              onClick={() => {
                setViewPhase && setViewPhase(true);
                showInfo((prev) => {
                  return !prev;
                });
              }}
              className="hover:bg-[#f5f5f5]  py-2 px-4 transition-all"
            >
              View Detail
            </div>
          )}
          {type !== "transaction" && type !== "reviews" && (
            <div
              onClick={() => {
                setEditPhase && setEditPhase(true);
                showInfo((prev) => {
                  return !prev;
                });
              }}
              className={`hover:bg-[#f5f5f5]  py-2 px-4 transition-all1`}
            >
              Edit Info
            </div>
          )}
          <div
            onClick={() => {
              setDelete();
            }}
            className="hover:bg-[#f5f5f5] text-[#ff385d]  py-2 px-4 transition-all"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}

export default Info;
