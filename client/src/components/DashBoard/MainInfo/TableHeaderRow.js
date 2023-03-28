import React from "react";

import TableHeader from "./Table/TableHeader";
import TableCellSort from "./Table/TableCellSort";

function TableHeaderRow({ headerList }) {
  return (
    <tr className="text-left  text-small last:border-b-0 border-b-2 border-[#f8f8f8] ">
      {headerList.map((elem, idx) => {
        if (typeof elem === "object" && !Array.isArray(elem) && elem !== null) {
          return (
            <TableHeader key={idx}>
              <TableCellSort elem={elem}></TableCellSort>
            </TableHeader>
          );
        }
        return <TableHeader key={idx}>{elem}</TableHeader>;
      })}
    </tr>
  );
}

export default TableHeaderRow;
