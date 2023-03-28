import React from "react";

function TableRow({ children }) {
  return (
    <tr className="hover:bg-[#f5f5f5] group text-small last:border-b-0 group border-b-2 border-[#f8f8f8] transition-all duration-300  rounded-md cursor-pointer">
      {children}
    </tr>
  );
}

export default TableRow;
