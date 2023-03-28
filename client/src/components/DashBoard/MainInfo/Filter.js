import React, { useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { IoReload } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useRef } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import gsap from "gsap/all";
import { DateRangePicker } from "react-date-range";
import { useDispatch } from "react-redux";
import { filterStatus, resetFilter } from "../../../store/filteredData";

let state = false;
function Filter({
  type,
  custom,
  filterResetParent,
  filterByDate,
  filterByStatus,
  filterByCategory
}) {
  const [openFilters, setFilterStatus] = useState(false);
  let firstRender = useRef(false);
  const [dropDownMenuItems, showDropdownMenuItems] = useState({
    date: false,
    orderStatus: false,
    orderType: false
  });
  const { current: timeline } = useRef(gsap.timeline());
  const { current: orderStatusDta } = useRef([
    "Pending",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ]);
  const { current: productTypes } = useRef([
    "Jacket & Coats",
    "Hoodies & SweatShirts",
    "Tshirts & Polos",
    "Joggers",
    "Shirts",
    "Jeans",
    "LoungeWear",
    "Pants & Chinos",
    "Socks",
    "Sets & OutFits",
    "Jumpers & KnitWear"
  ]);
  const [productCat, setProductCat] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection"
  };

  useEffect(() => {
    if (productCat) filterByCategory(productCat);
  }, [productCat]);
  useEffect(() => {
    if (firstRender.current) {
      if (endDate || startDate) {
        filterByDate(startDate, endDate, productCat);
        return;
      }
    }
    firstRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  useEffect(() => {
    if (openFilters) {
      timeline.to(".box", { width: "100%" }).to(".items-animate", {
        x: 0,
        stagger: 0.2,
        duration: ".4",
        ease: "Power2.easeOut",
        opacity: 1
      });
    }
  }, [openFilters]);
  useEffect(() => {
    if (state) {
      timeline
        .to(".dropdown", {
          height: "auto",
          duration: 0.1,
          ease: "Power2.easeOut"
        })
        .to(".dropdown-items", {
          opacity: 1,
          stagger: 0.15,
          duration: 0.06,
          ease: "Power2.easeOut"
        });
    }
    if (!state) state = true;
  }, [dropDownMenuItems]);

  function handleDateSelect(range) {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  }

  return (
    <div className="mr-6 box flex cursor-pointer">
      <div className="bg-gray-100 rounded-md flex font-semibold text-xs  items-center ">
        <div
          className="p-2.5 "
          onClick={() => {
            setFilterStatus((prev) => {
              return !prev;
            });
          }}
        >
          {openFilters ? (
            <FaFilter className="w-5 text-[#ff385d]  h-5"></FaFilter>
          ) : (
            <FiFilter className="w-5 h-5"></FiFilter>
          )}
        </div>
        {openFilters && (
          <>
            <div className="p-2.5 -translate-x-28  opacity-0  items-animate border-l-2 border-r-2">
              Filter By
            </div>
            <div className="relative -translate-x-28  opacity-0 items-animate border-r-2  space-x-1 ">
              <div
                className="flex p-2.5 items-center "
                onClick={() => {
                  showDropdownMenuItems((prev) => {
                    return {
                      date: !prev.date,
                      orderStatus: false,
                      orderType: false
                    };
                  });
                }}
              >
                <span>Date</span>
                <IoMdArrowDropdown className="w-4 h-4"></IoMdArrowDropdown>
              </div>

              {dropDownMenuItems.date && (
                <div className="absolute z-auto dropdown h-0 w-max shadow-sm rounded-b-md overflow-hidden top-full -left-1">
                  <DateRangePicker
                    color="#ff385d"
                    onChange={handleDateSelect}
                    ranges={[selectionRange]}
                  />
                </div>
              )}
            </div>
            {type !== "transaction" && type !== "reviews" && (
              <div className="relative -translate-x-28 opacity-0 items-animate border-r-2 space-x-1 ">
                <div
                  onClick={(e) => {
                    showDropdownMenuItems((prev) => {
                      return {
                        date: false,
                        orderStatus: false,
                        orderType: !prev.orderType
                      };
                    });
                  }}
                  className="flex p-2.5 items-center "
                >
                  <span>{type !== "products" ? "Order" : "Product"} Type</span>
                  <IoMdArrowDropdown className="w-4 h-4"></IoMdArrowDropdown>
                </div>
                {dropDownMenuItems.orderType && (
                  <div className="absolute w-max overflow-hidden h-0 shadow-sm dropdown bg-gray-100 rounded-b-md  top-full -left-1 ">
                    {productTypes.map((productType, idx) => {
                      return (
                        <div
                          onClick={() => {
                            setProductCat(productType);
                            showDropdownMenuItems((prev) => {
                              return { ...prev, orderType: !prev.orderType };
                            });
                          }}
                          key={idx}
                          className="p-2.5 dropdown-items opacity-0  hover:bg-gray-200 transition-all duration-150"
                        >
                          {productType.trim()}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {type !== "products" &&
              type !== "transaction" &&
              type !== "reviews" && (
                <div className="relative -translate-x-28 opacity-0 items-animate border-r-2 space-x-1 ">
                  <div
                    onClick={() => {
                      showDropdownMenuItems((prev) => {
                        return {
                          date: false,
                          orderStatus: !prev.orderStatus,
                          orderType: false
                        };
                      });
                    }}
                    className="flex p-2.5 items-center "
                  >
                    <span>Order Status</span>
                    <IoMdArrowDropdown className="w-4 h-4"></IoMdArrowDropdown>
                  </div>
                  {dropDownMenuItems.orderStatus && (
                    <div className="absolute w-full rounded-b-md h-0 overflow-hidden shadow-sm dropdown bg-gray-100  top-full -left-1 ">
                      {orderStatusDta.map((type, idx) => {
                        return (
                          <div
                            onClick={() => {
                              filterByStatus(type);
                              showDropdownMenuItems((prev) => {
                                return {
                                  date: false,
                                  orderStatus: !prev.orderStatus,
                                  orderType: false
                                };
                              });
                            }}
                            key={idx}
                            className="p-2.5 dropdown-items opacity-0 hover:bg-gray-200 transition-all duration-150"
                          >
                            {type}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            <div
              onClick={() => {
                custom ? filterResetParent() : dispatch(resetFilter());
                showDropdownMenuItems({
                  date: false,
                  orderStatus: false,
                  orderType: false
                });
              }}
              className="p-2.5 flex  -translate-x-28  opacity-0 items-animate  items-center text-[#ff385d] space-x-2"
            >
              <IoReload></IoReload>
              <span>Reset Filter</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Filter;
