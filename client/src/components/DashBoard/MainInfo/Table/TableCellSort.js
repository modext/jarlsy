import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch } from "react-redux";
import { sortBy } from "../../../../store/tableHeaderSortingReducer";

import StatusDropDown from "../StatusDropDown";

function TableCellSort({ elem }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      dispatch(sortBy(elem.name, sortOrder));
    }
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, dispatch]);

  return (
    <div
      onClick={() => {
        setSortOrder((prev) => {
          return prev === "asc" ? "desc" : "asc";
        });
      }}
      className="flex space-x-0.5 items-center relative cursor-pointer"
    >
      <div>{elem.name}</div>
      <div className="flex flex-col">
        <IoMdArrowDropup className="w-5 h-5 text-[#b1b1b1]"></IoMdArrowDropup>
        <IoMdArrowDropdown className="w-5 h-5 -mt-3 text-[#b1b1b1]"></IoMdArrowDropdown>
      </div>
      {elem.name === "Status" && elem.order === "asc" && (
        <StatusDropDown></StatusDropDown>
      )}
    </div>
  );
}

export default TableCellSort;
