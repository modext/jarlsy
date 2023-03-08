import { signOut } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { auth } from "../../../services/firebase";

function SideBarElem({ item }) {
  const [hover, setHover] = useState(false);
  const history = useHistory();
  const params = useLocation();
  let url = params.pathname.split("/")[2];

  return url ? (
    <div
      onClick={() => {
        if (item.name.toLowerCase() === "logout") {
          signOut(auth);
          history.push(`/`);
          return;
        }
        history.push(`/admin/${item.name.toLowerCase()}`);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={`flex items-center py-2 space-x-3.5 relative
 after:h-full hover:after:opacity-100  after:bg-[#ff385d23] after:transition-all after:rounded-full after:duration-500 after:absolute ${
   url.toLowerCase() === item.name.toLowerCase()
     ? "text-[#FF385C] after:opacity-100  after:w-[256px]"
     : "after:opacity-0"
 } hover:text-[#FF385C] hover:after:w-[270px] after:w-[20px] after:-left-2/3 after:-z-1 z-20 cursor-pointer transition-all duration-200`}
    >
      {hover || url.toLowerCase() === item.name.toLowerCase() ? (
        <item.hover className="w-6 h-6 transition-all duration-75"></item.hover>
      ) : (
        <item.icon className="w-6 h-6"></item.icon>
      )}
      <div>{item.name}</div>
    </div>
  ) : (
    <Redirect to="/admin/dashboard" />
  );
}

export default SideBarElem;
