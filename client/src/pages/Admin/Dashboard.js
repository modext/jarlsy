import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import DetailCardBox from "../../components/DashBoard/MainInfo/DetailSection/DetailCardBox";
import Graph from "../../components/DashBoard/MainInfo/Graph";
import GrossingProduct from "../../components/DashBoard/MainInfo/GrossingProduct";
import LatestOrders from "../../components/DashBoard/MainInfo/LatestOrders";
import { db } from "../../services/firebase";

function DashBoard() {
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grossingProduct, setGrossingProduct] = useState([]);
  const dispatch = useDispatch();

  function byDate(month, param, param2) {
    let filtered = param.filter((item) => {
      let date = new Date(item.timestamp.seconds * 1000);
      return date.getMonth() === month;
    });
    if (param2 === "visitors") {
      return filtered.length;
    } else {
      return filtered.reduce((prev, curr) => {
        return prev + curr.qty;
      }, 0);
    }
  }
  const data = useMemo(() => {
    let datas = [];
    Array(12)
      .fill("")
      .forEach((_, idx) => {
        datas.push(byDate(idx, orders));
      });
    return datas;
  }, [orders]);
  const visitorsData = useMemo(() => {
    let visits = [];
    Array(12)
      .fill("")
      .forEach((_, idx) => {
        visits.push(byDate(idx, visitors, "visitors"));
      });
    return visits;
  }, [visitors]);

  const [revenue, setRevenue] = useState(0);
  async function getAdminData() {
    try {
      let products = await getDocs(
        collection(db, "users", user.uid, "products")
      );
      let revenue = await getDocs(
        collection(db, "users", user.uid, "productsAdminInfo")
      );
      let messages = await getDocs(
        collection(db, "users", user.uid, "messages")
      );

      let visitors = await getDoc(doc(db, "users", user.uid));
      let modifiedRev = [];
      revenue.forEach((item) => {
        modifiedRev.push({ ...item.data(), id: item.id });
      });
      let grossingProduct = modifiedRev
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      let revSum = 0;
      revenue.forEach((doc) => {
        revSum += doc.data().revenue;
      });
      let orders = await getDocs(
        collection(db, "users", user.uid, "incomingOrders")
      );
      let ordersArr = [];
      let productsArr = [];
      products.forEach((docs) => {
        productsArr.push({ ...docs.data(), id: docs.id });
      });
      orders.forEach((docs) => {
        ordersArr.push({ ...docs.data(), id: docs.id });
      });
      let totalInfo = [];
      grossingProduct.forEach((item) => {
        totalInfo.push({
          ...productsArr.find((pr) => pr.id === item.id),
          ...item
        });
      });
      let messageArr = [];
      messages.forEach((message) => {
        messageArr.push({ ...message.data(), id: message.id });
      });

      dispatch({
        type: "MESSAGE_UPDATED",
        payload: messageArr.filter((item) => item.pendingMessage === true)
          .length
      });
      setGrossingProduct([...totalInfo]);
      setProducts([...productsArr]);
      setOrders([...ordersArr]);
      setVisitors([...visitors.data().visitors]);
      setRevenue(revSum);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  useEffect(() => {
    user && getAdminData().finally(() => setLoading(true));
  }, [user]);
  return (
    <div className={`${!loading ? "h-screen" : ""}`}>
      {loading ? (
        <>
          <DetailCardBox
            products={products.length}
            revenue={revenue}
            order={orders.length}
            visitors={visitors.length}
          ></DetailCardBox>
          <div className="flex mt-6 space-x-6">
            <Graph orders={data} visitors={visitorsData}></Graph>
            <GrossingProduct
              grossingProduct={grossingProduct}
            ></GrossingProduct>
          </div>
          <LatestOrders user={user}></LatestOrders>
        </>
      ) : (
        <div className="flex absolute  top-[55%] left-[55%] -translate-x-[55%] -translate-y-1/2 ">
          <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
