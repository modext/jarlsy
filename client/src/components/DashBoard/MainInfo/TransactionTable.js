import React, { useState } from "react";
import Info from "./Info";
import TableData from "./Table/TableData";
import TableRow from "./Table/TableRow";

function TransactionTable({ type, setActionWithId, tableData }) {
  function setAction(type) {
    setActionWithId({ type });
  }

  return (
    <TableRow>
      <TableData>{tableData.transactionId}</TableData>
      <TableData>
        <div className=" capitalize">{tableData.name.toLowerCase()}</div>
      </TableData>
      <TableData>${tableData.amount}</TableData>
      <TableData>{tableData.date}</TableData>
      <TableData>
        <div className="flex items-center space-x-2.5">
          <div>{tableData.method}</div>
        </div>
      </TableData>
      <TableData>
        <div className=" capitalize">{tableData.payment}</div>
      </TableData>
    </TableRow>
  );
}

export default TransactionTable;
