import React from "react";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function Sort({ liftDropdownItem }) {
  const [dropDown, setDropDown] = useState({
    open: false,
    clickedItem: "Recommended"
  });

  return (
    <div className="flex text-sm space-x-2">
      <div className="font-medium">Sort By</div>
      <div className=" cursor-pointer relative">
        <div
          onClick={() => {
            setDropDown((prev) => {
              return { ...prev, open: !prev.open };
            });
          }}
          className="flex items-center"
        >
          <div>{dropDown.clickedItem}</div>
          <div className="-ml-0.5">
            <IoMdArrowDropdown className="w-5 h-5" />
          </div>
        </div>
        {dropDown.open && (
          <div className="animplane opacity-0 absolute w-[120%]  top-full rounded-sm -left-2 z-40 bg-white shadow-md">
            {["Recommended", "Lowest Price", "Highest Price"].map(
              (item, idx) => {
                return (
                  <div
                    onClick={() => {
                      setDropDown((prev) => {
                        return { ...prev, clickedItem: item, open: !prev.open };
                      });
                      liftDropdownItem(item);
                    }}
                    key={idx}
                    className="hover:bg-gray-100 hover:font-medium transition-all duration-150 p-2.5 pb-1.5"
                  >
                    {item}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;
