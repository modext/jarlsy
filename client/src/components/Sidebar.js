import gsap from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import useWindow from "../hooks/useWindow";
import { ReactComponent as Cross } from "../icons/cross.svg";
import { ReactComponent as BackArrow } from "../icons/back-arrow.svg";
import { Link, useHistory } from "react-router-dom";

function Sidebar({
  closeSide,
  currSelected,
  items,
  selectTab,
  expanding,
  toExpand,
  selectedTab
}) {
  const [width] = useWindow();
  const history = useHistory();
  const [showInner, setInner] = useState(undefined);
  const [closingState, setClosingState] = useState(false);
  const triggerFromInner = useRef(null);
  const timeline = useRef(
    gsap.timeline({
      onReverseComplete: () => {
        closeSide(false);
      }
    })
  );

  useEffect(() => {
    if (closingState) {
      timeline.current.timeScale(4).reverse(0.7);
    }
  }, [closingState]);

  useEffect(() => {
    if (width > 700) {
      if (showInner === null) {
        timeline.current
          .to(".bor", {
            opacity: 0,
            width: 0,
            height: 0,
            duration: 0.007,
            ease: "Linear.easeNone"
          })
          .to(".slide", {
            width: "33.333%",
            ease: "Linear.easeNone",
            duration: ".3"
          })
          .to(".expand-side", { opacity: 0, ease: "Linear.easeNone" });
      }
      if (showInner)
        timeline.current
          .to(".slide", {
            width: "100vw",
            ease: "Power3.easeOut",
            duration: ".5"
          })
          .to(".expand-side", { opacity: 1, x: 0, duration: 0.4, delay: 0.1 })
          .to(".img", { opacity: 1, x: 0, duration: 0.4 }, "<.4")
          .to(".left-b", {
            width: ".25rem",
            height: "100%",
            opacity: 1,
            duration: ".14",
            ease: "Power3.easeOut"
          })
          .to(".bottom-b", {
            opacity: 1,
            height: ".25rem",
            width: "100%",
            duration: ".14",
            ease: "Power3.easeOut"
          })
          .to(".right-b", {
            opacity: 1,
            height: "100%",
            width: ".25rem",
            duration: ".14",
            ease: "Power3.easeOut"
          })
          .to(".top-b", {
            opacity: 1,
            height: ".25rem",
            width: "100%",
            duration: ".14",
            ease: "Power3.easeOut"
          });
    }
    if (width < 700 && showInner)
      timeline.current
        .from(".expand-side", { opacity: 0 })
        .to(".expand-side", { opacity: 1 });
  }, [showInner]);

  useEffect(() => {
    if (!triggerFromInner.current) {
      timeline.current.to(".slide", {
        opacity: 1,
        x: 0,
        duration: ".17"
      });
    }
    timeline.current
      .to(".menu", {
        opacity: 1,
        delay: 0.1
      })
      .to(
        ".list",
        {
          stagger: 0.2,
          duration: 0.11,
          opacity: 1,
          ease: "Linear.easeNone"
        },
        "<.1"
      );
  }, [selectedTab]);

  return (
    <div
      className={` fixed   slide top-0 transform -translate-x-full ${
        width > 700 && "flex"
      } 	 opacity-0  h-screen px-11  py-8 ${
        width > 700 ? " w-4/12 " : "w-full"
      } z-30 bg-white shadow-2xl 
        } `}
    >
      <div className="bor left-b opacity-0 absolute bg-red-500 top-0 left-0 "></div>
      <div className="bor bottom-b opacity-0 absolute bg-red-500 bottom-0 left-0 "></div>
      <div className="bor right-b opacity-0 absolute bg-red-500 bottom-0 right-0 "></div>
      <div className="bor top-b opacity-0 absolute bg-red-500 top-0 right-0 "></div>
      <Cross
        onClick={() => {
          setClosingState(true);
        }}
        className={`absolute ${
          width > 700 ? "top-8 w-6 h-6 right-10" : "w-4 h-4 top-9 right-8"
        }  z-40 cursor-pointer transition-all fill-current hover:text-[#FF385C] `}
      ></Cross>
      <div className="menu">
        <div>
          <ul className="flex font-medium text-base cursor-pointer flex-wrap">
            {items.map((item, idx) => {
              return (
                <li
                  className="hover-list-2 mr-8 "
                  onClick={() => {
                    selectTab(item);
                    triggerFromInner.current = true;
                    showInner && setInner(null);
                    toExpand && expanding(false);
                  }}
                  key={idx}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`mt-16 ${
            width < 700 && showInner ? " hidden" : "!visible"
          }`}
        >
          {!Array.isArray(currSelected)
            ? Object.keys(currSelected).map((item) => {
                return item === "id" || item === "Img" ? null : (
                  <>
                    <div
                      key={currSelected.id}
                      onClick={() => {
                        if (Array.isArray(currSelected[item])) {
                          setInner(item);
                          expanding(true);
                        } else {
                          setInner(null);
                          expanding(false);
                        }
                      }}
                      className="mb-8 cursor-pointer inline-block"
                    >
                      <h2
                        onClick={() => {
                          if (item === "Trending") {
                            setClosingState(true);
                            history.push("/shop/mens/clothing/all-clothing");
                            return;
                          }
                        }}
                        className="list opacity-0 hover-list-2 text-4xl uppercase font-extrabold"
                      >
                        {item}
                      </h2>
                    </div>
                    <br />
                  </>
                );
              })
            : currSelected.map((el, idx) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        if (selectedTab === "Collections") {
                          if (el === "Diversity Collection") {
                            history.push("/shop/mens/brand/vans");
                          }
                          if (el === "Stratnum Collection") {
                            history.push("/shop/mens/brand/levis");
                          }
                          setClosingState(true);
                        }
                      }}
                      className="list mb-8 cursor-pointer opacity-0 font-extrabold hover-list-2 text-4xl uppercase inline-block"
                      key={idx + el}
                    >
                      {el}
                    </div>
                    <br />
                  </>
                );
              })}
          {(selectedTab === "Sale" ||
            selectedTab === "Gifts" ||
            selectedTab === "Boys") && (
            <div className=" bg-[#FF385C] text-xl mt-4 -skew-y-2 w-max p-2 text-white font-semibold ">
              Coming Soon
            </div>
          )}
        </div>
      </div>
      {width < 700 && showInner && (
        <BackArrow
          onClick={() => {
            setInner(null);
          }}
          className="absolute top-9 left-3 cursor-pointer w-5 h-5"
        />
      )}
      <div
        className={`text-lg flex-1 ${
          width > 700 ? "ml-16 mt-20 " : " ml-8 mt-6 "
        } opacity-0 transform -translate-x-8 font-regular    expand-side`}
      >
        {showInner &&
          currSelected[showInner].map((item, idx) => {
            return (
              <>
                <div
                  onClick={() => {
                    if (showInner === "Accessories" && selectedTab === "Mens") {
                      return;
                    }
                    if (selectedTab === "Boys") {
                      return;
                    }
                    setClosingState(true);
                    history.push(
                      `/shop/${currSelected.id
                        .split("#")[1]
                        .toLowerCase()}s/${showInner.toLowerCase()}/${item
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    );
                  }}
                  key={idx}
                  className="mb-3 hover-list-2 inline-block cursor-pointer"
                >
                  {item}
                </div>
                <br />
              </>
            );
          })}
        {showInner === "Accessories" && (
          <div className=" bg-[#FF385C] text-xl mt-4 -skew-y-2 w-max p-2 text-white font-semibold ">
            Coming Soon
          </div>
        )}
      </div>
      {currSelected.Img && showInner && width > 700 && (
        <div
          onClick={() => {
            setClosingState(true);
            history.push("/shop/mens/clothing/all-clothing");
          }}
          className="cursor-pointer group relative "
        >
          <div className="img w-full h-5/6 -translate-x-3 relative opacity-0  -translate-y-1/2 transform top-1/2 overflow-hidden ">
            <img
              alt=""
              src={currSelected.Img[showInner === "Brand" ? 1 : 0]}
              className="transition-transform duration-500 group-hover:!scale-101 w-full h-full object-cover
         "
            />
          </div>
          <span className="relative z-30 -left-12 text-[#FF385C] top-3 group-hover:-left-14 group-hover:opacity-100 transition-all duration-500 opacity-0 inline-block transform -rotate-90 font-bold">
            Shop Now
          </span>
          <span className="w-0.5 h-0 delay-200 duration-500 bg-[#FF385C] group-hover:h-2/6 transition-all  inline-block absolute bottom-40 -left-4"></span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
