import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageWImage from "./MessageWImage";
import SendInput from "./SendInput";

function MessageBox({
  messages,
  userName,
  pendingMessage,
  loader,
  user,
  setMessage,
  pathname
}) {
  const lastMessage = useRef("");

  useEffect(() => {
    if (lastMessage.current !== null) {
      lastMessage.current.scrollIntoView({
        behavior: "smooth",
        inline: "nearest"
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 h-full flex flex-col  border-gray-200 rounded-md border-[.5px]">
      <div className="flex items-center p-3 shadow-sm border-gray-200  border-b-[.5px] space-x-2.5 cursor-pointer">
        <div className="relative">
          <img
            src="/img/dashboard/profile.jpeg"
            className="w-11 rounded-full object-cover h-11"
            alt=""
          />
          {pendingMessage && (
            <div className="w-3 h-3 top-0 left-0 absolute bg-red-400 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <div className="flex space-x-1">
            <div>{userName.slice(0, 14)}</div>
            <span className=" uppercase">
              {userName.slice(14, 39).split("-").join("")}
            </span>
          </div>
          <div className="text-gray-500 text-xs">Active Now</div>
        </div>
      </div>
      <div className="no-scrollbar flex-1 overflow-scroll">
        <div className="p-3 flex-1 ">
          {messages.map((individualMessage, idx) => {
            return (
              <div key={idx}>
                {Array.isArray(individualMessage.message) && (
                  <MessageWImage
                    ref={lastMessage}
                    user={user}
                    pathname={pathname}
                    loader={idx === messages.length - 1 && loader}
                    individualMessage={individualMessage}
                  ></MessageWImage>
                )}
                {!Array.isArray(individualMessage.message) && (
                  <Message
                    individualMessage={individualMessage}
                    idx={idx}
                    user={user}
                    allMessages={messages}
                    ref={lastMessage}
                  ></Message>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <SendInput user={user} messageSubmit={setMessage}></SendInput>
    </div>
  );
}

export default MessageBox;
