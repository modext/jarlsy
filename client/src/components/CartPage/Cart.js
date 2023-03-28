import React from "react";
import CartItems from "./CartItems";

function Cart({ shoppingBag }) {
  return (
    <div className=" w-7/12">
      <div className="">
        {shoppingBag.map((prod) => {
          return <CartItems key={prod.id} item={prod}></CartItems>;
        })}
      </div>
    </div>
  );
}

export default Cart;
