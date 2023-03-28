import React from "react";
import { ReactComponent as Truck } from "../icons/delivery-truck.svg";
import { ReactComponent as Card } from "../icons/card.svg";
import { ReactComponent as Returns } from "../icons/return-box.svg";
import NewsLetter from "./NewsLetter";
function FeatureSec() {
  return (
    <>
      <div className="my-20">
        <div className="flex space-x-3 lg:space-x-0 items-center m-auto justify-between  w-w87">
          <div className="flex flex-col  items-center">
            <Card className="w-14 h-14"></Card>
            <h3 className="font-medium text-md mt-1.5">Payment Methods</h3>
            <span className="font-normal text-xs">
              {" "}
              Choose from different payment methods
            </span>
          </div>
          <div className="flex flex-col items-center -ml-24">
            <Truck className="w-16 h-16"></Truck>
            <h3 className="font-medium text-md -mt-1">Delivery</h3>
            <span className="font-normal text-xs">
              {" "}
              Standard delivery from 2 to 7 working days
            </span>
          </div>
          <div className="flex flex-col items-center mr-3">
            <Returns className="w-14 h-14"></Returns>
            <h3 className="font-medium text-md mt-1.5">Easy Returns</h3>
            <span className="font-normal text-xs">Return by Mail</span>
          </div>
        </div>
        <NewsLetter></NewsLetter>
      </div>
    </>
  );
}

export default FeatureSec;
