import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";
import Filter from "../../components/DashBoard/MainInfo/Filter";

import ReviewsTableRowWrapper from "../../components/DashBoard/MainInfo/Reviews/ReviewsTableRowWrapper";
import Search from "../../components/DashBoard/MainInfo/Search";
import { db } from "../../services/firebase";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const reviewsCopy = useRef([]);
  const [reload, setRelaod] = useState(false);
  const { user } = useSelector((state) => {
    return {
      user: state.user,
      products: state.products,
      tableHeaderSorting: state.tableHeaderSorting,
      filteredData: state.filteredData
    };
  });

  useEffect(() => {
    async function getReviews() {
      let collRev = await collection(
        db,
        "users",
        user.user.uid,
        "productReviews"
      );
      let docs = await getDocs(collRev);
      if (docs.size === 0) {
        setMessage("No Reviews found");
        return;
      }
      let reviewsArr = [];
      docs.forEach((item) => {
        if (item.data().reviews.length > 0) {
          reviewsArr.push({ ...item.data(), id: item.id });
        }
      });
      setReviews(
        [...reviewsArr].sort(
          (a, b) => b.createdAt.seconds - a.createdAt.seconds
        )
      );
      reviewsCopy.current = reviewsArr;
      reload && setRelaod(false);
    }
    (user.user || reload) && getReviews();
  }, [user.user, reload]);

  function filterByDate(start, end) {
    const filteredData = reviewsCopy.current.filter((product) => {
      let d1 = new Date(product.createdAt.seconds * 1000);
      let d2 = start;
      let d3 = end;
      return d2.toDateString() !== d3.toDateString()
        ? d1 >= d2 && (d1 <= d3 || d1.toDateString() === d3.toDateString())
        : d1.toDateString() === d2.toDateString();
    });
    setReviews(filteredData);
    filteredData.length === 0 && setMessage("No Reviews found");
  }
  return (
    <div className="h-panel">
      <div className="bg-white overflow-scroll h-full  no-scrollbar relative shadow-sm_dark rounded-md mt-6 p-small">
        <div className="px-1.5 flex items-center relative z-50 justify-between">
          <Filter
            filterResetParent={() => {
              setReviews(reviewsCopy.current);
            }}
            custom={true}
            filterByDate={filterByDate}
            type="reviews"
          ></Filter>
          <Search></Search>
        </div>
        <div className="mt-5">
          <div className="space-y-5">
            {reviews.length > 0 ? (
              reviews.map((tableData, idx) => {
                return (
                  <ReviewsTableRowWrapper
                    setReload={setRelaod}
                    type="reviews"
                    key={idx}
                    admin={{ name: user.user.displayName, uid: user.user.uid }}
                    tableData={tableData}
                  ></ReviewsTableRowWrapper>
                );
              })
            ) : message ? (
              <div className="flex font-medium text-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <div className="text-[#FF385C]">{message}</div>
              </div>
            ) : (
              <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-16 h-16"></ImSpinner2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
