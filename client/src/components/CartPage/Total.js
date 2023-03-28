import React from "react";

function Total({ totalPrice, cart }) {
  return (
    <div className="p-3">
      <div
        className={`${
          cart ? "space-y-3 py-5" : "space-y-2.5 py-3"
        }  border-t-[1px]  border-[#c5c5c5] border-b-[1px]`}
      >
        <div
          className={`flex ${cart ? "text-sm" : "text-xs"}  justify-between`}
        >
          <div className="text-[#7c7c7c]">Order Value</div>
          <div>${(Math.round(totalPrice * 100) / 100).toFixed(2)}</div>
        </div>
        <div className={`flex ${cart ? "text-sm" : "text-xs"} justify-between`}>
          <div className="text-[#7c7c7c]">Delivery</div>
          <div> {totalPrice > 0 ? "$3.99" : "0.00"} </div>
        </div>
      </div>
      <div
        className={`flex font-medium mt-2 ${
          cart ? "text-md" : "text-sm"
        } justify-between`}
      >
        <div>Total</div>
        <div>
          $
          {totalPrice > 0
            ? (Math.round(totalPrice * 100) / 100 + 3.99).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
}

export default Total;
