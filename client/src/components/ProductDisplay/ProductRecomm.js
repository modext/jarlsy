import React from "react";
import Product from "../Product";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

function ProductRecomm({ products, title }) {
  const [idx, setIdx] = useState(0);
  return (
    <div
      style={{
        width: `calc((${window.innerWidth}px - 2 * ${"2.75rem"} - 1.5rem)`
      }}
      className="relative"
    >
      <div className="text-2xl font-medium capitalize mb-5">
        {title.toLowerCase()}
      </div>
      <div className="overflow-hidden">
        <div
          style={{ transform: `translate(-${idx * 338}px)` }}
          className="flex transition-all duration-300"
        >
          {products.map((product) => {
            return (
              <div
                key={product.id}
                style={{
                  width: `calc((${window.innerWidth}px - 2 * 2.75rem) / 4 - 1.5rem)`
                }}
                className={`flex-shrink-0 mr-6`}
              >
                <Product
                  prodDesc={product}
                  elongate={true}
                  expandHeight={true}
                ></Product>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        {products.length > 5 && idx !== products.length - 4 && (
          <div
            onClick={() => {
              if (idx >= products.length - 1) {
                return;
              }
              setIdx((prev) => prev + 1);
            }}
            className="absolute group hover:border-[1px] hover:border-[#FF385C] transition-all duration-150  hover:shadow-sm_dark flex justify-center items-center bg-white group w-12 h-12 rounded-full top-1/2 -translate-y-1/2 shadow-2xl cursor-pointer"
            style={{
              right: `-24px`
            }}
          >
            <IoIosArrowForward className="w-6 group-hover:fill-current group-hover:text-[#FF385C]  h-6"></IoIosArrowForward>
          </div>
        )}
        {idx > 0 && (
          <div
            onClick={() => {
              if (idx <= 0) {
                return;
              }
              setIdx((prev) => prev - 1);
            }}
            className="absolute group hover:border-[1px] hover:border-[#FF385C] hover:shadow-sm_dark flex justify-center items-center bg-white w-12 h-12 rounded-full transition-all duration-150 top-1/2 -translate-y-1/2 shadow-2xl cursor-pointer"
            style={{ left: `-24px` }}
          >
            <IoIosArrowBack className="w-6 group-hover:fill-current group-hover:text-[#FF385C]  h-6"></IoIosArrowBack>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductRecomm;
