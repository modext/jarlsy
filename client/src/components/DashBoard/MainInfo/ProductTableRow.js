import React, { useState } from "react";
import TableData from "./Table/TableData";
import TableRow from "./Table/TableRow";
import Info from "./Info";

function ProductTableRow({ viewFunc, editFunc, tableData, type }) {
  const [load, setLoad] = useState(false);
  function convertDate(sec) {
    let date = new Date(sec * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1 > 9
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    }/${date.getFullYear()}`;
  }

  function shortenTitle(title) {
    if (title.length >= 25) {
      return `${title.substr(0, 25)}...`;
    }
    return title;
  }
  return (
    <TableRow>
      <TableData>
        <div className="flex items-center  space-x-3">
          <img
            onLoad={() => {
              setLoad(true);
            }}
            className={`w-12 h-12 ${
              !load ? "blur-sm bg-[#f0f0f0]" : ""
            } object-cover rounded-md`}
            src={tableData.productImg[0]}
            alt=""
          />
          <div className="capitalize">{shortenTitle(tableData.title)}</div>
        </div>
      </TableData>
      <TableData>{tableData.category}</TableData>
      <TableData>{convertDate(tableData.createdAt.seconds)}</TableData>
      <TableData>
        {tableData.currency === "USD" ? "$" : ""}
        {tableData.prize}
      </TableData>
      <TableData>{tableData.inStock}</TableData>
      <TableData>{tableData.adminInfo.sold}</TableData>
      <TableData>
        <div className="font-medium">
          ${(Math.round(tableData.adminInfo.revenue * 100) / 100).toFixed(2)}
        </div>
      </TableData>
      <TableData className="px-1.5 py-2.5">
        <Info
          setViewPhase={() => {
            viewFunc(tableData);
          }}
          setEditPhase={() => {
            editFunc(tableData);
          }}
          type={type}
        ></Info>
      </TableData>
    </TableRow>
  );
}

export default ProductTableRow;
