import React, { useRef, useState } from "react";
import { useEffect } from "react";

function Elements({ children, type, notifyParent, selectedVals }) {
  const [clickedVal, setClicked] = useState(false);
  const isUnmounting = useRef(false);
  useEffect(() => {
    if (selectedVals.length === 0) {
      setClicked(false);
    }
  }, [selectedVals]);
  useEffect(() => {
    return () => {
      isUnmounting.current = true;
    };
  }, []);
  useEffect(() => {
    return () => {
      if (isUnmounting.current && clickedVal) {
        notifyParent(children);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedVal]);
  return (
    <div
      onClick={() => {
        setClicked((prev) => {
          return !prev;
        });
        notifyParent(children);
      }}
      className={`py-[4px] ${
        clickedVal ? "text-[#FF385C]" : "text-[#000000]"
      } animplane flex items-center space-x-1.5 group  capitalize font-regular text-sm cursor-pointer`}
    >
      {type === "Colour" && (
        <div
          style={{ backgroundColor: `${children.toLowerCase()}` }}
          className={`w-3 h-3 border-[0.5px] group-hover:border-[1px] transition-all duration-150 group-hover:border-black  border-black opacity-70 rounded-sm`}
        ></div>
      )}
      <span>{children}</span>
    </div>
  );
}

export default Elements;
