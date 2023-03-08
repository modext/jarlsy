import React from "react";

function TableData({ children, type }) {
  return (
    <td className={`px-1.5 ${type === "reviews" ? "w-9/12" : ""} py-2.5`}>
      {children}
    </td>
  );
}

export default TableData;
