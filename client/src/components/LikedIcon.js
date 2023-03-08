import React, { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

function LikedIcon({ cart, likedProducts, prod }) {
  const [heart, setSwitchHeart] = useState(false);
  const dispatch = useDispatch();
  let found = likedProducts.find((product) => product.id === prod.id);

  return (
    <div
      onClick={() => {
        if (!found) {
          dispatch({ type: "ADD_LIKED", payload: prod });
          return;
        }
        if (found) {
          dispatch({ type: "REMOVE_LIKED", payload: prod });
        }
      }}
      onMouseEnter={() => {
        setSwitchHeart(true);
      }}
      onMouseLeave={() => {
        setSwitchHeart(false);
      }}
      className={
        !cart
          ? `border-2 border-black ${
              found && "bg-[#FF385C] border-transparent"
            } cursor-pointer  flex items-center justify-center rounded-full hover:bg-[#FF385C] transition-all duration-150  hover:border-white  w-10 h-10 p-[1.3rem]`
          : `cursor-pointer `
      }
    >
      <div>
        {!cart ? (
          heart || found ? (
            <RiHeartFill className="w-6 text-white fill-current h-6" />
          ) : (
            <RiHeartLine className="w-7 h-7" />
          )
        ) : heart || found ? (
          <RiHeartFill className="w-6 text-[#FF385C] fill-current h-6" />
        ) : (
          <RiHeartLine className="w-7 h-7 " />
        )}
      </div>
    </div>
  );
}

export default LikedIcon;
