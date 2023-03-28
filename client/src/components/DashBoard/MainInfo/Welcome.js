import React from "react";

function Welcome() {
  return (
    <div className="w-full h-[164px] relative shadow-sm_dark rounded-md overflow-hidden">
      <div className="absolute z-20 top-5 left-5 font-bold  flex flex-col">
        <span className="text-3xl text-[#000000]">Good Morning</span>
        <span className="text-3xl  text-[#000000]">Danish</span>
        <h3 className="font-medium mt-1 text-md text-[#3b3b3b]">
          Hope you are doing well
        </h3>
      </div>
      <img
        src="../img/dashboard/welcome.png"
        className="w-full h-full object-cover object-center"
        alt=""
      />
    </div>
  );
}

export default Welcome;
