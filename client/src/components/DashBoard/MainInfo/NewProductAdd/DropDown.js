import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function DropDown({
  multiple,
  dropdownList,
  getAllValues,
  title,
  def = false
}) {
  let first = useRef(false);
  const [dropdown, expandDropDown] = useState(false);
  const [selected, setSelected] = useState(multiple ? [] : dropdownList[0]);
  useEffect(() => {
    if (!first.current || def) {
      getAllValues(multiple ? [] : dropdownList[0], title);
      setSelected(multiple ? [] : dropdownList[0]);
    }
    first.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def]);

  useEffect(() => {
    if (first.current) {
      if (multiple) {
        getAllValues(selected, title);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      {title !== "currency" && (
        <div className="font-medium text-small capitalize">{title}</div>
      )}
      <ul className={`relative   mt-2  text-small  font-regular`}>
        <li
          onClick={() => {
            expandDropDown((prev) => !prev);
          }}
          className={`flex ${
            dropdown ? "shadow-sm rounded-t-md border-b-0" : "rounded-md "
          }  cursor-pointer border-gray-300 border-[.5px]border-gray-300 border-[.5px] p-2 justify-between  items-center capitalize `}
        >
          <div>{multiple ? "Size" : selected}</div>
          <IoMdArrowDropdown className="w-4 h-4"></IoMdArrowDropdown>
        </li>
        {dropdown && (
          <ul className="absolute z-50 left-0 top-full w-full h-full  ">
            {dropdownList.map((elem, idx) => {
              let selectedIdx;
              Array.isArray(selected) &&
                selected.forEach((el) => {
                  if (el.elem === elem && el.idx === idx) {
                    selectedIdx = true;
                  }
                });
              if (selected === elem) {
                return null;
              }
              return (
                <li
                  onClick={() => {
                    if (multiple) {
                      setSelected((prev) => {
                        let found = prev.find((el) => {
                          return el.elem === elem;
                        });
                        if (found) {
                          return prev.filter((el) => el.elem !== found.elem);
                        }
                        return [...prev, { elem, idx }];
                      });
                      return;
                    }
                    setSelected(elem);
                    getAllValues(elem, title);
                    expandDropDown(false);
                  }}
                  key={idx}
                  className={`p-2 bg-white relative border-gray-300 border-r-[.5px] border-l-[.5px] hover:bg-gray-50 capitalize last:border-b-[.5px] last:rounded-b-md  cursor-pointer  ${
                    selectedIdx ? "bg-gray-100" : ""
                  }`}
                >
                  {elem}
                </li>
              );
            })}
          </ul>
        )}
      </ul>
    </>
  );
}

export default DropDown;
