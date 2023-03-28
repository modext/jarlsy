import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { ReactComponent as Menu } from "../icons/menu.svg";
import { RiUser3Fill, RiUser3Line, RiArrowDropDownFill } from "react-icons/ri";
import { IoCart, IoCartOutline } from "react-icons/io5";
import useWindow from "../hooks/useWindow";
import Icons from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/modal";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect } from "react";
import BagReview from "./Navbar/BagReview";
import LikedProduct from "./LikedProduct";
import { useHistory } from "react-router-dom";

function Nav({ items, openSide, selectTab }) {
  const history = useHistory();
  const [width] = useWindow();
  const [enter, setEnter] = useState(false);
  const { user, addTo, likedProducts } = useSelector((state) => {
    return {
      user: state.user,
      addTo: state.addToBag,
      likedProducts: state.likedProducts
    };
  });

  const dispatch = useDispatch();
  const [expand, expandCart] = useState(false);

  useEffect(() => {
    if (addTo.length === 0) expandCart(false);
  }, [addTo]);
  const [dropDown, setDropdown] = useState(false);

  const triggerDropDown = () => {
    setDropdown((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <nav className="flex  flex-row items-center px-4 lg:px-11 py-3 lg:py-3 shadow-md justify-between ">
      <div
          onClick={() => {
            history.push("/");
          }}
          className=" flex space-x-5 lg:space-x-10 font-logo m-auto cursor-pointer top-1/2 left-2 lg:ml-16   transform -translate-x-1/2  text-4xl font-bold text-[#000000] "
        >
          Salesfash.
        </div>
        <ul className="flex  space-x-5 lg:space-x-10   font-medium text-xs lg:text-base cursor-pointer">
          {width > 700 ? (
            items.map((item, idx) => {
              return (
                <li
                  className="hover-list"
                  onClick={(e) => {
                    openSide(true);
                    selectTab(item);
                  }}
                  key={idx}
                >
                  {item}
                </li>
              );
            })
          ) : (
            <li>
              <Menu
                onClick={() => {
                  openSide(true);
                  selectTab("Men");
                }}
                className="w-4 h-4  cursor-pointer "
              ></Menu>
            </li>
          )}
        </ul>
        <div className="">
          <ul className="flex items-center space-x-4  lg:space-x-10 ">
            <div></div>
            <div className="relative ">
              <div
                onMouseEnter={() => {
                  setEnter(true);
                }}
                onMouseLeave={() => {
                  setEnter(false);
                }}
                onClick={triggerDropDown}
                className="flex space-x-1.5 items-center"
              >
                <Icons
                  parentHover={enter}
                  filledicon={RiUser3Fill}
                  icon={RiUser3Line}
                ></Icons>
                <div className="text-sm">
                  {user.user ? (
                    <div className="flex">
                      <div className="cursor-pointer font-medium text-md">
                        {user.user.displayName}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="cursor-pointer">Login/SignUp</div>
                    </>
                  )}
                </div>
              </div>
              {dropDown && (
                <div className="z-50 absolute w-max  font-semibold overflow-hidden text-sm  left-0 shadow-sm_dark rounded-md top-8  bg-white">
                  {user.user ? (
                    <>
                      <div
                        onClick={() => {
                          history.push("/MyOrders");
                          triggerDropDown();
                        }}
                        className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                      >
                        My Orders
                      </div>

                      {user.user.type === "admin" && (
                        <div
                          onClick={() => {
                            history.push("/admin/dashboard");
                            triggerDropDown();
                          }}
                          className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                        >
                          Admin Panel
                        </div>
                      )}
                      <div
                        onClick={() => {
                          signOut(auth);
                          triggerDropDown();
                          history.push("/");
                        }}
                        className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                      >
                        LogOut
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          dispatch(openModal(false));
                          triggerDropDown();
                        }}
                        className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                      >
                        SignIn/SignUp
                      </div>
                      <div
                        onClick={() => {
                          dispatch(openModal(true));
                          triggerDropDown();
                        }}
                        className="hover:bg-[#f5f5f5] cursor-pointer  py-2 px-4 transition-all"
                      >
                        SignUp Admin
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <LikedProduct likedProd={likedProducts}></LikedProduct>
            <div
              onClick={() => {
                addTo.length > 0 && expandCart((prev) => !prev);
              }}
              className="relative"
            >
              <div className="relative">
                <Icons
                  expand={expand}
                  filledicon={IoCart}
                  icon={IoCartOutline}
                ></Icons>
                <div className="absolute -top-0.5 w-4 h-4 flex justify-center items-center text-[10px] font-medium rounded-full text-white bg-[#FF385C] left-[63%] select-none ">
                  {addTo.length}
                </div>
              </div>
              {expand && <BagReview addToProd={addTo}></BagReview>}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
