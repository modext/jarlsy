import React from "react";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

function Accordian({ title, detail }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="border-b-[1px] group pb-3.5 border-[#707070] cursor-pointer">
      <div
        onClick={() => {
          setClicked((prev) => !prev);
        }}
        className="flex space-x-1 items-center"
      >
        <div className="font-medium text-lg select-none">{title}</div>
        <div>
          <HiPlus className="w-[0.95rem] group-hover:stroke-2 transition-all duration-200 stroke-1 h-[0.95rem]" />
        </div>
      </div>
      {clicked && detail && <div className="text-small py-2">{detail}</div>}
    </div>
  );
}

export default Accordian;
