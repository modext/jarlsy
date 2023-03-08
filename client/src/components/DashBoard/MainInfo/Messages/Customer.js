import React from "react";

function Customer({ message, notifyParent, selected }) {
  function convertDate(sec) {
    let date = new Date(sec * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1 > 9
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    }/${date.getFullYear()}`;
  }

  return (
    <div
      onClick={() => {
        notifyParent(message.id);
      }}
      className={`flex w-full  transition-all duration-300 ${
        selected && "bg-[#FF385C] text-white"
      } hover:bg-[#FF385C] group hover:text-white cursor-pointer items-center p-4 first:rounded-t-md last:rounded-b-md border-gray-200  flex-grow-0  border-[.5px] border-b-0 last:border-b-[.5px] space-x-2.5`}
    >
      <div className="relative flex-shrink-0">
        <img
          src="/img/dashboard/profile.jpeg"
          className="w-11 rounded-full object-cover h-11"
          alt=""
        />
        {message.pendingMessage && (
          <div className="w-3 h-3 top-0 left-0 absolute bg-red-400 border-2 border-white rounded-full"></div>
        )}
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex text-sm justify-between">
          <div>
            <div>{message.userName.slice(0, 14)}</div>
            <span className=" uppercase">
              {message.userName.slice(14, 39).split("-").join("")}
            </span>
          </div>
          <div className="text-[9px]">
            {message.timestamp?.seconds &&
              convertDate(message.timestamp.seconds)}
          </div>
        </div>
        <div
          className={`text-xs transition-all duration-300 ${
            selected ? "text-white" : "text-gray-600"
          } group-hover:text-white `}
        >
          {Array.isArray(message.messages[message.messages.length - 1].message)
            ? "...."
            : message.messages[message.messages.length - 1].message}
        </div>
      </div>
    </div>
  );
}

export default Customer;
