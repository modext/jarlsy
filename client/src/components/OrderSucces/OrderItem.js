import React, { useState } from "react";
import { GoStar } from "react-icons/go";
import { BiDetail } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import AddReview from "./AddReview";
import { useHistory } from "react-router-dom";

function OrderItem({ item }) {
  const [review, setSideRev] = useState(false);
  const history = useHistory();

  return (
    <>
      <div className="flex border-b-[1.7px] border-[#e0e0e0] last:border-b-[0px] py-7 first:pt-0 last:pb-0 ">
        <div className="self-start mr-3">
          <img
            className="w-[4.3rem] h-[4.3rem] bg-gray-200 rounded-sm object-cover"
            src={item.productImg[0]}
            alt=""
          />
        </div>
        <div className="w-72 ">
          <div className=" cursor-pointer text-sm capitalize mb-1 ">
            {item.title.toLowerCase()}
          </div>
          <div className="flex space-x-3.5 text-[#777777] ">
            <div>
              <div className="text-xs w-28 flex justify-between">
                <span>Colour:</span>
                <span className="capitalize ">{item.colour}</span>
              </div>
              <div className="text-xs my-[2px] w-28 flex justify-between">
                <span>Quantity:</span>
                <span> {item.orderedQty}</span>
              </div>
            </div>
            <div className="text-xs w-28 flex justify-between">
              <div className="">Total Price:</div>
              <span>
                $
                {(
                  (Math.round(item.prize * 100) / 100) *
                  item.orderedQty
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="text-xs mt-1 font-medium">
            ${(Math.round(item.prize * 100) / 100).toFixed(2)}
          </div>
        </div>
        <div className="flex-1 mr-16 ml-8 flex items-center">
          <div className="flex w-[33.33%] relative items-center">
            <div
              className={`absolute font-medium ${
                item.orderStatus === "Pending" ||
                item.orderStatus === "Shipped" ||
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "text-[#FF385C]"
                  : "text-[#c7c7c7]"
              }   text-xs bottom-[160%] -translate-x-1/2 `}
            >
              Ordered
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                item.orderStatus === "Pending" ||
                item.orderStatus === "Shipped" ||
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              } `}
            ></div>
            <div
              className={`  ${
                item.orderStatus === "Shipped" ||
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              } w-full h-1`}
            ></div>
          </div>
          <div className="flex w-[33.33%] relative items-center">
            <div
              className={`absolute font-medium ${
                item.orderStatus === "Shipped" ||
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "text-[#FF385C]"
                  : "text-[#c7c7c7]"
              }  text-xs bottom-[160%] -translate-x-1/2 `}
            >
              Shipped
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                item.orderStatus === "Shipped" ||
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              }`}
            ></div>
            <div
              className={`${
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              } w-full h-1 `}
            ></div>
          </div>
          <div className="flex relative w-[33.33%] items-center">
            <div
              className={`absolute font-medium ${
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "text-[#FF385C]"
                  : "text-[#c7c7c7]"
              }  text-xs bottom-[160%] -translate-x-1/2 `}
            >
              Out for Delivery
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                item.orderStatus === "Out for Delivery" ||
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              }`}
            ></div>
            <div
              className={`${
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              } w-full h-1 `}
            ></div>
            <div
              className={`w-3 h-3 rounded-full ${
                item.orderStatus === "Delivered"
                  ? "bg-[#FF385C]"
                  : "bg-[#e0e0e0]"
              }`}
            ></div>
            <div
              className={`absolute font-medium  ${
                item.orderStatus === "Delivered"
                  ? "text-[#FF385C]"
                  : "text-[#c7c7c7]"
              } text-xs bottom-[160%] -translate-x-1/2 left-full `}
            >
              Delivered
            </div>
          </div>
        </div>
        <div className=" self-center  space-y-2 ">
          <div
            onClick={() => {
              setSideRev((prev) => !prev);
            }}
            className="font-medium  transition-all duration-200  cursor-pointer hover:text-[#FF385C]  items-center space-x-1 flex text-xs"
          >
            <div>
              <GoStar />
            </div>
            <div>Rate & Review Product</div>
          </div>
          <div className="text-xs flex items-center space-x-1  cursor-pointer hover:text-[#FF385C] transition-all duration-200  font-medium">
            <div>
              <BiDetail></BiDetail>
            </div>
            <div> Show Detail</div>
          </div>
          <div
            onClick={() => {
              history.push(`/myChats/${item.adminId}/${item.id}`);
            }}
            className="text-xs flex items-center space-x-1  cursor-pointer hover:text-[#FF385C] transition-all duration-200  font-medium"
          >
            <div>
              <AiOutlineMessage></AiOutlineMessage>
            </div>
            <div>Message</div>
          </div>
        </div>
      </div>
      {review && (
        <div className="text-right">
          <AddReview
            notifyToClose={() => {
              setSideRev(false);
            }}
            item={{
              name: item.title,
              img: item.productImg[0],
              productId: item.id,
              category: item.category
            }}
            adminId={item.adminId}
          />
        </div>
      )}
    </>
  );
}

export default OrderItem;
