import React, { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import OrderTableRow from "./OrderTableRow";
import TableHeaderRow from "./TableHeaderRow";
import { useHistory } from "react-router-dom";
import { getOrderData } from "../../../store/orderStore";
import { ImSpinner2 } from "react-icons/im";

function LatestOrders({ user }) {
  const { orders } = useSelector((state) => {
    return {
      orders: state.orders
    };
  });
  const history = useHistory();
  const dispatcher = useDispatch();

  useEffect(() => {
    if (user) {
      dispatcher(getOrderData(user.uid));
    }
  }, [user, dispatcher]);
  return (
    <div className="bg-white min-h-[50vh] relative  shadow-sm_dark rounded-md mt-6 p-small">
      <div className="flex items-center px-1.5  justify-between">
        <h3 className="font-medium text-lg">Latest Orders</h3>
        <div
          onClick={() => {
            history.push("/admin/orders");
          }}
          className="text-sm cursor-pointer hover:text-[#ff385d] transition-all duration-300 group flex items-center space-x-1"
        >
          <span>View All</span>
          <BsArrowRight className="relative group-hover:left-[1.5px]"></BsArrowRight>
        </div>
      </div>
      {orders.orders.length > 0 ? (
        <div className="mt-3">
          <table className="w-full">
            <TableHeaderRow
              headerList={[
                "Order No",
                "Name",
                "Product",
                "Address",
                "Date",
                "Price",
                "Status"
              ]}
            ></TableHeaderRow>
            {orders.orders.slice(0, 6).map((tableData, idx) => {
              return (
                <OrderTableRow
                  key={idx}
                  showBread={true}
                  detailedItem={tableData}
                ></OrderTableRow>
              );
            })}
          </table>
        </div>
      ) : orders.message !== "" ? (
        <div className="flex absolute font-medium text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="text-[#FF385C]">{orders.message}</div>
        </div>
      ) : (
        <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
        </div>
      )}
    </div>
  );
}

export default LatestOrders;
