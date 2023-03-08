import React from "react";

function Notification({ title, message }) {
  return (
    <div className="p-3 flex border-gray-200 border-[.5px] border-b-0 last:border-b-[.5px] justify-between items-center last:rounded-b-sm first:rounded-t-sm space-y-1  ">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm">{message}</div>
      </div>

      <div className=" w-[53px] relative border-[.5px] border-gray-200 rounded-full h-[24px]">
        <input
          className="opacity-0 z-40 translate-x-full checked:translate-x-0 relative peer w-[26px] h-full"
          type="checkbox"
        />
        <span className="bg-gray-200 p-1 top-0 h-full w-full  peer-checked:bg-[#fb4e6efd]  left-0 absolute rounded-full  inline-block before:w-[23px] before:absolute before:top-0 before:shadow-sm_dark before:bg-white before:transition-all before:duration-300 before:rounded-full peer-checked:before:translate-x-[28px] before:left-0 cursor-pointer before:h-[22px]"></span>
      </div>
    </div>
  );
}

export default Notification;
