import React from "react";

function StatusDropDown() {
  return (
    <div className="absolute top-full left-0 shadow-sm_dark rounded-md bg-white">
      <div className="font-medium text-xs px-2 py-1">Sort By</div>
      <div className="flex flex-col text-xs font-normal">
        <span className="px-2 py-1 hover:bg-[#f5f5f5] transition-all">
          Pending
        </span>
        <span className="px-2 py-1 hover:bg-[#f5f5f5] transition-all">
          Success
        </span>
        <span className="px-2 py-1 hover:bg-[#f5f5f5] transition-all">
          Delivered
        </span>
      </div>
    </div>
  );
}

export default StatusDropDown;
