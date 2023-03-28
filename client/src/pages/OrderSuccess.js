import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WrapperOrders from "../components/OrderSucces/WrapperOrders";
import { db } from "../services/firebase";

function OrderSuccess() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getOrders() {
      try {
        let results = await getDocs(
          collection(db, "users", user.uid, "orders")
        );
        let resultedDocs = [];
        results.forEach((doc) => {
          resultedDocs.push({ id: doc.id, ...doc.data() });
        });

        setOrders(
          resultedDocs.sort((a, b) => {
            return b.timestamp.seconds - a.timestamp.seconds;
          })
        );
        setLoading(true);
      } catch (err) {
        setLoading(false);
      }
    }
    if (user) getOrders();
  }, [user]);

  return (
    <div className="my-8 max-w-screen-2xl m-auto px-11">
      <div className=" mb-4  text-xl font-medium ">My Orders</div>
      <div className=" space-y-7">
        {loading ? (
          orders.length > 0 ? (
            orders.map((order) => {
              return <WrapperOrders order={order}></WrapperOrders>;
            })
          ) : (
            "No Orders found"
          )
        ) : (
          <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSuccess;
