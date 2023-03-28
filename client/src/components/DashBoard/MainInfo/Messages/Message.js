import React, { forwardRef } from "react";

const Message = forwardRef(
  ({ individualMessage, user, idx, allMessages }, ref) => {
    function time() {
      let timeSec = individualMessage.timestamp.seconds
        ? individualMessage.timestamp.toDate().toLocaleTimeString("en-US")
        : individualMessage.timestamp.toLocaleTimeString("en-US");
      let timeSplit = timeSec.split(":");
      let timeOfDay = timeSec.split(" ");

      return `${timeSplit[0]}:${timeSplit[1]} ${timeOfDay[1]}`;
    }
    return (
      <div
        ref={ref}
        className={`flex  ${idx === allMessages.length - 1 ? "" : "mb-3"}  ${
          individualMessage.userId === user.uid ? "rt" : ""
        }
       space-x-3.5`}
      >
        <img
          src="/img/dashboard/profile.jpeg"
          className="w-10  rounded-full object-cover h-10"
          alt=""
        />
        <div className="text-sm space-y-1 text-gray-600">
          <div
            className={`p-3 rounded-md clip relative before:w-3  ${
              individualMessage.userId === user.uid
                ? "before:-right-1"
                : "before:-left-1"
            }  before:h-4 before:bg-gray-100 before:rotate-45 before:z-10 z-30  before:absolute before:top-1 hello  max-w-[450px] whitespace-pre-wrap  bg-gray-100`}
          >
            {individualMessage.message}
          </div>
          <div className="text-xs text-right">{time()}</div>
        </div>
      </div>
    );
  }
);

export default Message;
