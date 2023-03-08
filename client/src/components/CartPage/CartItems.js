import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikedIcon from "../LikedIcon";
import Qty from "../Qty";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { remove, update } from "../../store/addToBag";

function WrapperItem({ children }) {
  return <div className="flex w-44 justify-between text-sm">{children}</div>;
}

function CartItems({ item }) {
  let size = item.size[item.sizeSelected || 0].elem;
  const dispatch = useDispatch();
  const [qty, setQty] = useState("");
  const first = useRef(false);
  const getQuantity = (val) => {
    setQty(val);
  };
  useEffect(() => {
    first.current &&
      qty !== item.qty &&
      dispatch(update(item, qty, item.sizeSelected));
    first.current = true;
  }, [qty, dispatch]);

  const { likedProducts } = useSelector((state) => {
    return { likedProducts: state.likedProducts };
  });
  return (
    <div className="flex cursor-pointer space-x-5 border-b-[1px] py-7 first:pt-0 border-[#dfdfdf]">
      <img
        className="w-32 h-40 rounded-sm object-cover"
        src={item.productImg[0]}
        alt=""
      />

      <div className="space-y-1 py-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-md capitalize">{item.title.toLowerCase()}</div>
          <div className="text-md font-medium mt-0.5">
            ${(Math.round(item.prize * 100) / 100).toFixed(2)}
          </div>
        </div>
        <div className="space-y-1 text-[#000000ea]">
          <div className="flex space-x-14">
            <WrapperItem>
              <div className="">Quantity:</div>
              <div>{item.qty}</div>
            </WrapperItem>
            <WrapperItem className="flex">
              <div className="">Colour:</div>
              <div className="capitalize">{item.colour}</div>
            </WrapperItem>
          </div>
          <div className="flex space-x-14">
            <WrapperItem className="flex">
              <div className="">Size:</div>
              <div className=" capitalize ">
                {size.startsWith("X") ||
                size.startsWith("3") ||
                size.startsWith("4")
                  ? size === "X-Large" || size === "X-Small"
                    ? size
                        .split("")
                        .filter((el) => el !== "-")
                        .slice(0, 2)
                    : size
                        .split("")
                        .filter((el) => el !== "-")
                        .slice(0, 3)
                  : size.slice(0, 1)}
              </div>
            </WrapperItem>
            <WrapperItem>
              <div className="">Total:</div>
              <div>
                ${(Math.round(item.qty * item.prize * 100) / 100).toFixed(2)}
              </div>
            </WrapperItem>
          </div>
        </div>
        <div className="flex space-x-4  items-center">
          <div>
            <LikedIcon
              cart={true}
              likedProducts={likedProducts}
              prod={item}
            ></LikedIcon>
          </div>
          <div>
            <Qty
              inStock={item.inStock}
              selected={item.qty}
              notify={getQuantity}
              notShow={true}
            ></Qty>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(remove(item));
        }}
        className="pt-2.5"
      >
        <RiDeleteBin6Fill className="w-5  transition-all duration-300 hover:text-[#FF385C] fill-current h-5" />
      </div>
    </div>
  );
}

export default CartItems;
