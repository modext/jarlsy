import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

function Qty({ notShow, notify = null, selected, navbar, inStock }) {
  const [num, setNum] = useState(1);
  let first = useRef(false);

  useEffect(() => {
    notify && first.current && notify(num);
    first.current = true;
  }, [num]);

  useEffect(() => {
    selected && setNum(selected);
  }, [selected]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`${notify && "space-y-2"}`}
    >
      {!navbar && !notShow ? (
        <div className="text-md  select-none font-medium">Qty:</div>
      ) : (
        ""
      )}
      <div
        className={`
             border-[0.7px]   hover:border-[1px] flex w-max items-center cursor-pointer border-black capitalize rounded-sm ${
               navbar ? "space-x-1 h-4" : "space-x-1.5"
             } 
          `}
      >
        <div
          className={`group border-r-[1px] border-gray-300 ${
            navbar ? "px-0.5  py-[0.1rem]" : "px-1  py-[0.2rem]"
          }   hover:border-black`}
          onClick={() => {
            setNum((prev) => {
              return prev === 1 ? prev : prev - 1;
            });
          }}
        >
          <HiMinus
            className={` ${
              navbar ? "w-[0.55rem] h-[0.55rem]" : "w-[0.95rem] h-[0.95rem]"
            } transition-all duration-200 group-hover:stroke-1  `}
          />
        </div>
        <div className={`select-none ${navbar ? "text-[8px]" : "text-sm"}`}>
          {num}
        </div>
        <div
          className={`group border-gray-300 border-l-[1px] ${
            navbar ? "px-0.5  py-[0.1rem]" : "px-1  py-[0.2rem]"
          }  hover:border-black`}
          onClick={() => {
            setNum((prev) => {
              return prev === Number(inStock) ? prev : prev + 1;
            });
          }}
        >
          <HiPlus
            className={` ${
              navbar ? "w-[0.55rem] h-[0.55rem]" : "w-[0.95rem] h-[0.95rem]"
            } transition-all duration-200 group-hover:stroke-1 `}
          />
        </div>
      </div>
    </div>
  );
}

export default Qty;
