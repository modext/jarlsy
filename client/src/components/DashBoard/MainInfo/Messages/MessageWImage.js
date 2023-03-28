import React, { forwardRef, useState } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";

const MessageWImage = forwardRef(
  ({ individualMessage, pathname, loader, user }, ref) => {
    const [imgLoad, setImgLoad] = useState(false);
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
        className={` flex  items-start  space-x-3.5 ${
          individualMessage.userId === user.uid ? "rt" : ""
        } `}
      >
        <img
          src="/img/dashboard/profile.jpeg"
          className="w-10  rounded-full object-cover h-10"
          alt=""
        />
        <div>
          {individualMessage.message.map((image, indx) => {
            return (
              <>
                <div
                  ref={ref}
                  key={indx}
                  className="mb-3 space-y-1 text-gray-600 inline-block cursor-pointer"
                >
                  {image.type === "application/pdf" ? (
                    <div className="bg-gray-100 p-1 w-52 h-10 justify-between flex items-center rounded-md border-gray-200 border-[4px]">
                      <div className="  space-x-1 items-center  flex  ">
                        <AiFillFilePdf className="w-6 h-6"></AiFillFilePdf>
                        <a
                          href={image.url}
                          className="cursor-pointer  rounded-md items-center text-sm text-blue-500  flex"
                          download={image.name}
                          target="page"
                        >
                          {image.name}
                        </a>
                      </div>
                      <div className="text-xs">{image.size}</div>
                    </div>
                  ) : (
                    <div className="border-2 relative  rounded-md overflow-hidden border-[#FF385C]">
                      <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        {loader && (
                          <ImSpinner2 className="animate-spin  w-7 h-7 -ml-2 "></ImSpinner2>
                        )}
                      </div>
                      <div
                        className={` ${
                          pathname === "admin" ? "max-w-sm" : "max-w-[14rem]"
                        } `}
                      >
                        <img
                          src={image.url}
                          onLoad={() => {
                            setImgLoad(true);
                          }}
                          alt=""
                          className={` w-full ${
                            !imgLoad && "bg-gray-100  h-60"
                          }  ${
                            loader
                              ? "h-60 blur-sm opacity-40"
                              : "max-h-80 blur-0 opacity-100"
                          }    object-cover`}
                        />
                        {individualMessage.text && (
                          <div className=" bg-[#FF385C] py-0.5 text-white text-sm px-1 flex items-center w-full">
                            <span>{individualMessage.text}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-right">{time()}</div>
                </div>
                <br />
              </>
            );
          })}
        </div>
      </div>
    );
  }
);

export default MessageWImage;
