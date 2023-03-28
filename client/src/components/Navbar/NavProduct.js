import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Qty from "../Qty";
import { remove, update } from "../../store/addToBag";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

function NavProduct({ liked, prod }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const history = useHistory();
  const [qty, setQty] = useState("");
  const first = useRef(false);
  const getQuantity = (val) => {
    setQty(val);
  };
  useEffect(() => {
    first.current &&
      qty !== prod.qty &&
      dispatch(update(prod, qty, prod.sizeSelected));
    first.current = true;
  }, [qty, dispatch]);

  useEffect(() => {
    prod.sizeSelected !== undefined && setSelectedSize(prod.sizeSelected);
  }, [prod]);

  function shortenTitle(title) {
    if (title.length > 33) {
      return `${title.substr(0, 34)}`.toLowerCase();
    }
    return title.toLowerCase();
  }

  return (
    <div className="cursor-pointer group relative">
      <div
        onClick={() => {
          if (liked) {
            let title = prod.title.split(" ").join("-");
            title = title.includes("/")
              ? title.replace("/", "-")
              : title.includes("%")
              ? title.replace("%", "-")
              : title;
            let brand = prod.brand.split(" ").join("-");
            history.push(`/product/${brand}/${title}/${prod.id}`);
          }
        }}
        className="flex border-b-[0.5px] relative z-30 p-3  group-hover:w-[87%] group-hover:bg-gray-50 bg-white w-full group-hover:shadow-md  transition-all duration-500 items-center space-x-2"
      >
        <img
          className={` ${
            !liked ? "w-20 h-full" : "w-10 h-10"
          } flex-shrink-0  bg-gray-200 rounded-sm  object-cover`}
          src={prod.productImg[0]}
          alt=""
        />
        <div className="text-sm flex-shrink-0 capitalize">
          <div className=""> {shortenTitle(prod.title)}</div>
          <div className="flex -mt-0.5 items-center space-x-1.5">
            <div className="text-[12px]  font-medium">
              ${(Math.round(prod.prize * 100) / 100).toFixed(2)}
            </div>
          </div>
          {!liked && (
            <div className="">
              <div className="text-[12px] flex items-center">
                <span className="w-16 inline-block">Quantity :</span>
                <div>
                  <Qty
                    notify={getQuantity}
                    selected={prod.qty}
                    navbar={true}
                    inStock={prod.inStock}
                  ></Qty>
                </div>
              </div>
              <div className="text-[12px]">
                <span className="w-16 inline-block">Colour :</span>
                <div
                  className="inline-block w-[7px] h-[7px] rounded-full 
                       border-[.6px] cursor-pointer border-black"
                  style={{ backgroundColor: prod.colour }}
                ></div>
              </div>
              <div className="text-[12px] flex items-center">
                <span className="w-16 inline-block">Size :</span>
                <div className="flex space-x-1.5">
                  {prod.size.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSize(idx);
                          dispatch(update(prod, prod.qty, idx));
                        }}
                        className={`border-[.7px] ${
                          idx === selectedSize && "bg-[#000000] text-white"
                        } hover:bg-[#000000] justify-center  h-4 hover:border-white hover:text-white px-1 flex items-center  transition-all duration-150  cursor-pointer border-black capitalize select-none text-[8px] rounded-sm
        `}
                      >
                        <span className="inline-block ">
                          {item.elem.startsWith("X") ||
                          item.elem.startsWith("3") ||
                          item.elem.startsWith("4")
                            ? item.elem === "X-Large" || item.elem === "X-Small"
                              ? item.elem
                                  .split("")
                                  .filter((el) => el !== "-")
                                  .slice(0, 2)
                              : item.elem
                                  .split("")
                                  .filter((el) => el !== "-")
                                  .slice(0, 3)
                            : item.elem.slice(0, 1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          !liked
            ? dispatch(remove(prod))
            : dispatch({ type: "REMOVE_LIKED", payload: prod });
        }}
        className={`absolute z-0 top-0 left-0 w-full h-full bg-[#ececec] flex items-center ${
          !liked ? "p-4" : "p-3"
        }  justify-end`}
      >
        <RiDeleteBin6Fill className="w-5 transition-all duration-500 hover:text-[#FF385C] fill-current h-5" />
      </div>
    </div>
  );
}

export default NavProduct;
