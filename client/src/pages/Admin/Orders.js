import React, { useEffect, useRef, useState } from "react";
import Search from "../../components/DashBoard/MainInfo/Search";
import { ImSpinner2 } from "react-icons/im";
import Filter from "../../components/DashBoard/MainInfo/Filter";
import PaginationBtns from "../../components/DashBoard/MainInfo/PaginationBtns";
import TableHeaderRow from "../../components/DashBoard/MainInfo/TableHeaderRow.js";
import { useDispatch, useSelector } from "react-redux";
import {
  resettableHeader,
  sortByType
} from "../../store/tableHeaderSortingReducer";
import WrapperOrderTableRow from "../../components/DashBoard/MainInfo/WrapperOrderTableRow";
import {
  filterCategory,
  filterDate,
  filterStatus
} from "../../store/filteredData";
import InfoModal from "../../components/DashBoard/MainInfo/Modals/InfoModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { getOrderData, updateOrder } from "../../store/orderStore";

function Orders() {
  const [modalDta, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const firstRender = useRef(false);
  const { user, orders, tableHeaderSorting, filteredData } = useSelector(
    (state) => {
      return {
        user: state.user,
        orders: state.orders,
        tableHeaderSorting: state.tableHeaderSorting,
        filteredData: state.filteredData
      };
    }
  );
  const ordersArr = useRef(null);
  const [currPage, setCurrPage] = useState(1);
  function navigate(type) {
    setCurrPage((prev) => {
      return type === "forward" ? prev + 1 : prev - 1;
    });
  }

  function pagination(page) {
    let start = (page - 1) * 10;
    let end = 10 * page;
    return orders.orders.slice(start, end);
  }
  const dispatcher = useDispatch();
  useEffect(() => {
    return () => {
      dispatcher(resettableHeader());
    };
  }, []);
  useEffect(() => {
    if (orders.orders.length > 0 && !ordersArr.current) {
      ordersArr.current = [...orders.orders];
    }
  }, [orders.orders]);

  useEffect(() => {
    if (tableHeaderSorting.modifiedArr.length > 0 && firstRender.current) {
      dispatcher(updateOrder(tableHeaderSorting.modifiedArr));
    }
  }, [tableHeaderSorting.modifiedArr, dispatcher]);
  useEffect(() => {
    if (tableHeaderSorting.order && firstRender.current) {
      dispatcher(
        sortByType(orders.orders, tableHeaderSorting.sortElemName.toUpperCase())
      );
    }
  }, [tableHeaderSorting.sortElemName, tableHeaderSorting.order, dispatcher]);

  useEffect(() => {
    if (firstRender.current) {
      if (filteredData.length > 0) {
        dispatcher(updateOrder(filteredData));
        setCurrPage(1);
        return;
      }
      if (
        !Array.isArray(filteredData) &&
        filteredData !== null &&
        typeof filteredData === "object"
      ) {
        dispatcher(updateOrder(ordersArr.current));
        setCurrPage(1);
        return;
      }
      if (filteredData.length === 0) {
        dispatcher({ type: "ORDER_ERROR", payload: "No orders found" });
        return;
      }
    }
    firstRender.current = true;
  }, [filteredData, dispatcher]);

  useEffect(() => {
    if (user.user && !editMode) {
      dispatcher(getOrderData(user.user.uid));
    }
  }, [user.user, dispatcher, editMode]);

  function filterByDate(start, end) {
    dispatcher(
      filterDate({
        start,
        end,
        elementsArr: ordersArr.current,
        typeDta: "orders"
      })
    );
  }

  function filterByCategory(type) {
    dispatcher(
      filterCategory({
        type,
        elementsArr: ordersArr.current,
        typeDta: "orders"
      })
    );
  }

  function filterByStatus(type) {
    dispatcher(
      filterStatus({
        type,
        elementsArr: ordersArr.current,
        typeDta: "orders"
      })
    );
  }
  async function deleteOrders(id) {
    let nwProd = orders.orders.filter((item, idx) => {
      return item.id !== id;
    });
    dispatcher(updateOrder(nwProd));
    ordersArr.current = nwProd;
    try {
      await deleteDoc(doc(db, "users", user.user.uid, "incomingOrders", id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`h-panel space-x-2  flex  relative`}>
      <div
        className={`bg-white flex-1  relative  h-full shadow-sm_dark rounded-md mt-6 p-small`}
      >
        <div className="px-1.5 flex relative z-50  items-center justify-between">
          <Filter
            filterByCategory={filterByCategory}
            filterByDate={filterByDate}
            filterByStatus={filterByStatus}
          ></Filter>
          <Search></Search>
        </div>
        {orders.orders.length > 0 ? (
          <table className="w-full my-3">
            <thead>
              <TableHeaderRow
                headerList={[
                  "Order No",
                  "Name",
                  "Product",
                  "Address",
                  {
                    name: "Date"
                  },
                  {
                    name: "Price"
                  },
                  "Status"
                ]}
              ></TableHeaderRow>
            </thead>
            <tbody>
              {pagination(currPage).map((order) => {
                return (
                  <WrapperOrderTableRow
                    key={order.id}
                    viewFunc={(values) => {
                      setModalData(values);
                    }}
                    deleteFunc={deleteOrders}
                    modal={modalDta}
                    editFunc={(values) => {
                      setModalData(values);
                      setEditMode(true);
                    }}
                    type="order"
                    tableData={order}
                  ></WrapperOrderTableRow>
                );
              })}
            </tbody>
          </table>
        ) : orders.message !== "" ? (
          <div className="flex absolute font-medium text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <div className="text-[#FF385C]">{orders.message}</div>
          </div>
        ) : (
          <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
          </div>
        )}
        <div>
          <PaginationBtns
            forwardDisable={10 * currPage >= orders.orders.length}
            backBtn={currPage === 1 ? true : false}
            currPage={currPage}
            navigate={navigate}
          ></PaginationBtns>
        </div>
      </div>
      {modalDta && (
        <div className="w-60 h-full  mt-6">
          <InfoModal
            notifyParent={() => {
              setModalData(null);
              editMode && setEditMode(false);
            }}
            modalDta={modalDta}
            editMode={editMode}
          />
        </div>
      )}
    </div>
  );
}

export default Orders;
