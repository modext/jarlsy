import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdOutlineDashboard,
  MdMessage,
  MdOutlineMessage
} from "react-icons/md";
import {
  AiFillTag,
  AiOutlineTag,
  AiFillDollarCircle,
  AiOutlineDollarCircle,
  AiOutlineSetting,
  AiFillSetting
} from "react-icons/ai";
import {
  RiUserShared2Line,
  RiUserSharedFill,
  RiShoppingCartLine,
  RiShoppingCartFill
} from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { IoExitOutline, IoExitSharp } from "react-icons/io5";
import { useRef } from "react";
import SideBarElem from "./SideBarElem";
import { useHistory } from "react-router-dom";

function SideBar() {
  const { current: sideBarItems } = useRef([
    {
      name: "Dashboard",
      icon: MdOutlineDashboard,
      hover: MdSpaceDashboard
    },
    {
      name: "Products",
      icon: AiOutlineTag,
      hover: AiFillTag
    },
    {
      name: "Orders",
      icon: RiShoppingCartLine,
      hover: RiShoppingCartFill
    },
    {
      name: "Transactions",
      icon: AiOutlineDollarCircle,
      hover: AiFillDollarCircle
    },
    {
      name: "Reviews",
      icon: MdOutlineMessage,
      hover: MdMessage
    },
    {
      name: "Customers",
      icon: RiUserShared2Line,
      hover: RiUserSharedFill
    },
    {
      name: "Profile",
      icon: AiOutlineSetting,
      hover: AiFillSetting
    },
    {
      name: "LogOut",
      icon: IoExitOutline,
      hover: IoExitSharp
    }
  ]);

  const history = useHistory();
  const [active, setActive] = useState("");
  return (
    <div className="px-8 h-screen fixed top-0 left-0 z-50 bg-white font-medium text-center text-[#4e4e4e] text-ui shadow-lg py-8">
      <div className="font-logo font-bold text-[#000000]  text-3xl">
        Brance.
      </div>
      <div
        onClick={() => {
          history.push(`/admin/create-product`);
        }}
        className="my-7 flex items-center justify-center w-52 cursor-pointer text-white p-2.5 rounded-full m-auto bg-[#ff385d] space-x-2 transition-all duration-300 hover:shadow-darker"
      >
        <BsPlusLg className="w-4 h-4"></BsPlusLg>
        <div>Add New Product</div>
      </div>
      <div className="space-y-4 relative  inline-block">
        {sideBarItems.map((item, idx) => {
          return <SideBarElem key={idx} item={item} />;
        })}
      </div>
    </div>
  );
}

export default SideBar;
