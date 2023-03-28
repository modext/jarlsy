import React, { useState } from "react";
import { ReactComponent as Arrow } from "../icons/arrowUp.svg";
import Products from "./Products";

function ProductSection({ type, ImgAlignment }) {
  return (
    <>
      <div
        className={`flex h-[60vw]   items-center my-20 space-x-14 ${
          ImgAlignment === "right"
            ? "flex-row-reverse lg:pl-11 space-x-reverse"
            : "lg:pr-11"
        }`}
      >
        <div className="w-[25%] h-[70%] hidden lg:block shadow-darker overflow-hidden relative rounded-lg">
          <img
            src={`/img/${
              ImgAlignment === "right"
                ? "Productside2.webp"
                : `Productside1.webp`
            }`}
            className="w-full h-full object-cover"
            alt=""
          />
          <span
            className={`inline-flex absolute -rotate-90  text-[#FF385C] ${
              ImgAlignment === "right" ? "left-6/8 top-20" : "-right-28 top-32"
            } font-bold uppercase text-2xl`}
          >
            {type}
          </span>
          <span
            style={{
              [ImgAlignment === "right" ? "left" : "right"]: `${
                ImgAlignment === "right" ? "-2.75rem" : "-5.7rem"
              }`,
              textShadow:
                " -1px -1px 0 #000,  1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000",
              color: "#eeeced"
            }}
            className={`inline-flex absolute  -rotate-90 ${
              ImgAlignment === "right" ? "top-20" : "top-32 "
            }  font-bold uppercase text-2xl text-transparent`}
          >
            {type}
          </span>
          <div
            className={`absolute top-3 ${
              ImgAlignment === "right" ? "right-5/6" : "left-5/6 "
            } space-y-1`}
          >
            <Arrow className="w-4 h-4 fill-current text-[#FF385C]"></Arrow>
            <Arrow
              className="w-4 h-4 stroke-current text-black stroke-1"
              style={{ fill: "transparent" }}
            ></Arrow>
            <Arrow
              className="w-4 h-4 stroke-current text-black stroke-1"
              style={{ fill: "transparent" }}
            ></Arrow>
          </div>
        </div>
        <Products type={type}></Products>
      </div>
    </>
  );
}

export default ProductSection;
