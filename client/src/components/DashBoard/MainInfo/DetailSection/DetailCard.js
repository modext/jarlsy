import React from "react";
import { HiArrowNarrowUp } from "react-icons/hi";

function DetailCard({ detail }) {
  function chooseColor(category, choice) {
    if (category === "Total Revenue") {
      if (choice === "text") {
        return `text-green-500`;
      } else if (choice === "bg") {
        return `bg-green-100`;
      }
    } else if (category === "Total Order") {
      if (choice === "text") {
        return `text-red-500`;
      } else if (choice === "bg") {
        return `bg-red-100`;
      }
    } else if (category === "Total Products") {
      if (choice === "text") {
        return `text-purple-500`;
      } else if (choice === "bg") {
        return `bg-purple-100`;
      }
    } else if (category === "Total Visitors") {
      if (choice === "text") {
        return `text-blue-500`;
      } else if (choice === "bg") {
        return `bg-blue-100`;
      }
    } else {
      return;
    }
  }
  return (
    <div className="shadow-sm_dark hover:scale-101 transition-all duration-300 cursor-pointer mt-4 rounded-md flex justify-between items-start bg-white space-x-6 p-small">
      <div className="flex flex-col items-start space-y-4">
        <div
          className={`w-12 h-12 flex justify-center items-center ${chooseColor(
            detail.name,
            "bg"
          )}  rounded-md`}
        >
          <detail.icon
            className={`w-7 ${chooseColor(detail.name, "text")}  h-7`}
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-normal text-left text-small">{detail.name}</h4>
          <div className="font-semibold text-4xl">
            {detail.name === "Total Revenue"
              ? `$${detail.number}`
              : detail.number}
          </div>
        </div>
      </div>
      <div className="text-sm rounded-full p-1">
        <div className="flex space-x-1 text-green-800 items-center">
          <HiArrowNarrowUp className="w-4 -mr-1 h-4"></HiArrowNarrowUp>
          <div>8.5%</div>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
