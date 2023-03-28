import React, { useEffect, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import Icons from "./Icons";
import BagReview from "./Navbar/BagReview";

function LikedProduct({ likedProd }) {
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    likedProd.length === 0 && setExpand(false);
  }, [likedProd]);
  return (
    <div
      onClick={() => {
        likedProd.length > 0 && setExpand((prev) => !prev);
      }}
      className="relative"
    >
      <Icons
        expand={expand}
        filledicon={RiHeartFill}
        icon={RiHeartLine}
      ></Icons>
      {likedProd.length > 0 && (
        <div className="absolute -top-0.5 w-4 h-4 flex justify-center items-center text-[10px] font-medium rounded-full text-white bg-[#FF385C] left-[63%] select-none ">
          {likedProd.length}
        </div>
      )}

      {expand && <BagReview liked={true} addToProd={likedProd}></BagReview>}
    </div>
  );
}

export default LikedProduct;
