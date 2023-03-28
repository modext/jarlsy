import React, { useEffect, useState } from "react";
import useWindow from "../hooks/useWindow";

import Nav from "./Nav";
import Sidebar from "./Sidebar";

let NavItems = {
  Men: {
    id: "#MEN",
    Img: ["/img/nav.webp", "/img/nav2.jpeg"],
    Clothing: [
      "All Clothing",
      "Jacket & Coats",
      "Hoodies & SweatShirts",
      "Tshirts & Polos",
      "Joggers",
      "Shirts",
      "Jeans",
      "LoungeWear",
      "Pants & Chinos",
      "Socks"
    ],
    Accessories: ["All Accessories", "Bags", "Sunglasses", "Watches", "Wallet"],
    Brand: [
      "Nike",
      "Tommy Hilfiger",
      "H&M",
      "Adidas",
      "Gap",
      "North Face",
      "Levis",
      "Zara",
      "Next",
      "Urban Outfitters",
      "Vans",
      "Champion"
    ],
    Trending: "Trending"
  },
  Boys: {
    id: "#BOYS",
    Img: "/img/nav.jpeg",
    Clothing: [
      "All Clothing",
      "Jacket & Coats",
      "Jeans",
      "Joggers",
      "Sets & OutFits",
      "Shirts",
      "Jumpers & KniitWear",
      "Tshirt & Polos"
    ],
    Accessories: ["Bags"],
    Brand: [
      "Nike",
      "Tommy Hilfiger",
      "H&M",
      "Adidas",
      "Gap",
      "North Face",
      "Levis",
      "Zara",
      "Next",
      "Urban Outfitters",
      "Vans",
      "Champion"
    ]
  },
  Collections: ["Diversity Collection", "Stratnum Collection"],
  Sale: ["Men's Sale", "Boy's Sale"],
  Gifts: ["Gifts For Men", "Gifts For Kids"]
};

function HeaderSec() {
  const [sideBarExpanded, setSideBarExpanded] = useState(false);
  const [showSide, setShSide] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const [width] = useWindow();
  function signalSidebar(state) {
    setShSide(state);
  }
  useEffect(() => {
    sideBarExpanded && setSideBarExpanded(false);
  }, [showSide]);
  return (
    <>
      <Nav
        selectTab={setSelectedTab}
        openSide={signalSidebar}
        items={Object.keys(NavItems)}
      ></Nav>
      {showSide && (
        <Sidebar
          closeSide={signalSidebar}
          currSelected={selectedTab && NavItems[selectedTab]}
          items={Object.keys(NavItems)}
          selectTab={setSelectedTab}
          expanding={setSideBarExpanded}
          toExpand={sideBarExpanded}
          selectedTab={selectedTab}
        ></Sidebar>
      )}
      {showSide && !sideBarExpanded && (
        <div
          onClick={() => {
            setShSide(false);
          }}
          className="w-full fixed h-[240%] -top-40  z-10 bg-opacity-40 bg-black"
        ></div>
      )}
    </>
  );
}

export default HeaderSec;
