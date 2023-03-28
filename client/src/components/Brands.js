import React from "react";
import { ReactComponent as Boss } from "../icons/brands/boss.svg";
import { ReactComponent as Levis } from "../icons/brands/levis.svg";
import { ReactComponent as Nike } from "../icons/brands/nike.svg";
import { ReactComponent as Zara } from "../icons/brands/zara.svg";
import { ReactComponent as Burberry } from "../icons/brands/burberry.svg";
import { ReactComponent as Calvin } from "../icons/brands/calvin.svg";
import { ReactComponent as NorthFace } from "../icons/brands/northface.svg";
function Brands() {
  return (
    <div className="px-4 lg:px-11 max-w-screen-2xl my-auto text-center">
      <h2 className="text-[#FF385C] font-bold uppercase text-4xl">
        Brands we love
      </h2>
      <div className="flex space-x-10 lg:space-x-24 mt-10 mb-20">
        <Boss className="w-28 h-28"></Boss>
        <Levis className="w-28 h-28"></Levis>
        <Nike className="w-28 h-28"></Nike>
        <Zara className="w-28 h-28"></Zara>
        <Burberry className="w-28 h-28"></Burberry>
        <Calvin className="w-28 h-28"></Calvin>
        <NorthFace className="w-28 h-28"></NorthFace>
      </div>
    </div>
  );
}

export default Brands;
