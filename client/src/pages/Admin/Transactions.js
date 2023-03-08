import React, { useEffect, useRef, useState } from "react";
import Search from "../../components/DashBoard/MainInfo/Search";
import PaginationBtns from "../../components/DashBoard/MainInfo/PaginationBtns";
import TableHeaderRow from "../../components/DashBoard/MainInfo/TableHeaderRow.js";
import TransactionTable from "../../components/DashBoard/MainInfo/TransactionTable";
import Filter from "../../components/DashBoard/MainInfo/Filter";

import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { filterDate } from "../../store/filteredData";
import {
  getTransactionData,
  updateTransaction
} from "../../store/transactionsStore";

function Transactions() {
  const dispatcher = useDispatch();
  const transactionsArr = useRef(null);
  const firstRender = useRef(false);
  const [currPage, setCurrPage] = useState(1);
  const { user, transaction, filteredData } = useSelector((state) => {
    return {
      user: state.user,
      transaction: state.transaction,
      filteredData: state.filteredData
    };
  });
  function pagination(page) {
    let start = (page - 1) * 10;
    let end = 10 * page;
    return transaction.transaction.slice(start, end);
  }

  function filterByDate(start, end) {
    dispatcher(
      filterDate({
        start,
        end,
        elementsArr: transactionsArr.current,
        typeDta: "orders"
      })
    );
  }
  useEffect(() => {
    if (firstRender.current) {
      if (transactionsArr.current && filteredData.length > 0) {
        dispatcher(updateTransaction(filteredData));
        setCurrPage(1);
        return;
      }
      if (
        !Array.isArray(filteredData) &&
        filteredData !== null &&
        typeof filteredData === "object"
      ) {
        dispatcher(updateTransaction(transactionsArr.current));
        setCurrPage(1);
        return;
      }
      if (filteredData.length === 0 && transactionsArr.current) {
        dispatcher({
          type: "TRANSACTION_ERROR",
          payload: "No transactions found"
        });
        return;
      }
    }
    firstRender.current = true;
  }, [filteredData, dispatcher]);

  useEffect(() => {
    if (transaction.transaction.length > 0 && !transactionsArr.current) {
      transactionsArr.current = [...transaction.transaction];
    }
  }, [transaction.transaction]);

  function convertDate(sec) {
    let date = new Date(sec * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1 > 9
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    }/${date.getFullYear()}`;
  }

  function navigate(type) {
    setCurrPage((prev) => {
      return type === "forward" ? prev + 1 : prev - 1;
    });
  }
  function shortenTitle(title) {
    if (title.length > 24) {
      return `${title.substr(0, 25)}..`.toLowerCase();
    }
    return title.toLowerCase();
  }
  useEffect(() => {
    if (user.user) {
      dispatcher(getTransactionData(user.user.uid));
    }
  }, [user.user, dispatcher]);
  return (
    <div className={`h-panel relative`}>
      <div
        className={`bg-white flex-1  relative  h-full shadow-sm_dark rounded-md mt-6 p-small`}
      >
        <div className="px-1.5 flex items-center justify-between">
          <Filter filterByDate={filterByDate} type="transaction"></Filter>
          <Search></Search>
        </div>
        <table className="w-full my-3">
          {transaction.transaction.length > 0 ? (
            <table className="w-full my-3">
              <thead>
                <TableHeaderRow
                  headerList={[
                    "Transaction ID",
                    "Product",
                    "Payment",
                    "Date",
                    "PayMent Method",
                    "PayMent Status"
                  ]}
                ></TableHeaderRow>
              </thead>
              <tbody>
                {pagination(currPage).map((transaction) => {
                  if (transaction.status !== "Delivered") {
                    return null;
                  }
                  return (
                    <TransactionTable
                      type="transaction"
                      tableData={{
                        transactionId: transaction.id.split("-").reverse()[0],
                        name: shortenTitle(transaction.details.title),
                        amount: (
                          transaction.qty * transaction.details.prize
                        ).toFixed(2),
                        method: "Visa",
                        payment: transaction.payment_status,
                        date: convertDate(transaction.timestamp.seconds)
                      }}
                    ></TransactionTable>
                  );
                })}
              </tbody>
            </table>
          ) : transaction.message !== "" ? (
            <div className="flex absolute  font-medium text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="text-[#FF385C]">{transaction.message}</div>
            </div>
          ) : (
            <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
            </div>
          )}
          <div>
            <PaginationBtns
              forwardDisable={10 * currPage >= transaction.transaction.length}
              backBtn={currPage === 1 ? true : false}
              currPage={currPage}
              navigate={navigate}
            ></PaginationBtns>
          </div>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
