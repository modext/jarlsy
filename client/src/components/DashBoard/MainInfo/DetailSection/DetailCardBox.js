import React, { useEffect } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import DetailCard from "./DetailCard";
import { FaBoxOpen, FaTruck, FaUsers } from "react-icons/fa";
function DetailCardBox({ products, visitors, revenue, order }) {
  const prInfo = [
    {
      name: "Total Revenue",
      icon: GiReceiveMoney,
      number: (Math.round(revenue * 100) / 100).toFixed(2)
    },
    { name: "Total Order", icon: FaTruck, number: order },
    {
      name: "Total Products",
      icon: FaBoxOpen,

      number: products
    },
    { name: "Total Visitors", icon: FaUsers, number: visitors }
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {prInfo.map((inf, key) => {
          return <DetailCard key={key} detail={inf}></DetailCard>;
        })}
      </div>
    </div>
  );
}

export default DetailCardBox;
