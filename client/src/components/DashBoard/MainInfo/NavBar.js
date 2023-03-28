import React, { useState } from "react";
import { ReactComponent as Notification } from "../../../icons/notification.svg";
import { ReactComponent as Message } from "../../../icons/message1.svg";
import { AiOutlineCaretDown } from "react-icons/ai";
import Search from "./Search";
import { useHistory, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useSelector } from "react-redux";

function NavBar() {
  const location = useLocation();
  const history = useHistory();
  const { messages, notifications } = useSelector((state) => {
    return state.navData;
  });
  const [dropDown, setDropDown] = useState();
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="text-nav font-semibold  capitalize">
          {location.pathname.split("/")[2] === "settings"
            ? "Profile Setting"
            : location.pathname.split("/")[2] === "create-product"
            ? "Create Product"
            : location.pathname.split("/")[2]}
        </div>
        <div className="flex items-center text-[#4e4e4e] space-x-3">
          <Search section="nav"></Search>
          <div
            onClick={() => {
              history.push("/admin/customers");
            }}
            className="cursor-pointer group relative p-2.5 transition-all duration-300 hover:bg-[#ff385d23]"
          >
            <Message className="w-6 group-hover:fill-[#ff385d]  group-hover:stroke-[#ff385d] transition-all stroke-[2px] stroke-[#4e4e4e] fill-[#4e4e4e00] h-6"></Message>
            {messages > 0 ? (
              <div className="text-xs rounded-full font-regular absolute top-1 left-5  text-center bg-[#ff385d] group-hover:bg-white group-hover:text-[#ff385d]   text-white w-4 h-4">
                {messages}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="cursor-pointer relative group p-2.5 transition-all duration-200 hover:bg-[#ff385d23] ">
            <Notification className="w-6 group-hover:fill-[#ff385d] group-hover:stroke-[#ff385d] fill-[#4e4e4e00] stroke-[5px] stroke-[#4e4e4e] transition-all  h-6"></Notification>
            {notifications > 0 && (
              <div className="text-xs rounded-full font-regular absolute top-1 left-5  text-center bg-[#ff385d] group-hover:bg-white group-hover:text-[#ff385d]   text-white w-4 h-4">
                {notifications}
              </div>
            )}
          </div>
          <div className="relative">
            <div
              onClick={() => {
                setDropDown((prev) => {
                  return !prev;
                });
              }}
              className={`cursor-pointer flex pl-2.5 items-center space-x-1 overflow-hidden pt-[1px] ${
                dropDown ? "bg-white  drop-shadow-md rounded-t-md  " : ""
              }   `}
            >
              <img
                className={`w-10 rounded-full border-2 transition-all duration-300  hover:border-[#ff385d] ${
                  dropDown ? "border-[#ff385d]" : ""
                }  object-cover`}
                src="https://d.newsweek.com/en/full/822411/pikachu-640x360-pokemon-anime.jpg?w=1600&h=1600&q=88&f=b65592079ef009b8b80897ddb8660b29"
                alt=""
              />
              <AiOutlineCaretDown></AiOutlineCaretDown>
            </div>
            {dropDown && (
              <div className="z-50  absolute w-max  drop-shadow-md font-semibold overflow-hidden text-sm  right-0 rounded-b-md top-full  bg-white">
                <div
                  className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                  onClick={() => {
                    history.push("/admin/profile");
                    setDropDown(false);
                  }}
                >
                  Account Info
                </div>
                <div
                  onClick={() => {
                    signOut(auth);
                    history.push("/");
                  }}
                  className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
