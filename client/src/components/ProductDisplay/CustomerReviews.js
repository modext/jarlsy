import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

function CustomerReviews({ reviews }) {
  function renderStars(rating) {
    let totalStars = 5;
    let filled = [...Array(Math.floor(rating))].map((_) => {
      return (
        <BsStarFill
          key={Math.random()}
          className="w-[1.43rem] h-[1.43rem] fill-current text-[#FFC107]"
        />
      );
    });
    let empty = [];
    if (rating % 1 === 0) {
      empty = [...Array(totalStars - rating)].map((_, idx) => (
        <BsStarFill
          key={Math.random()}
          className={`w-[1.43rem] h-[1.43rem] fill-current text-[#ECEFF1]`}
        />
      ));
    } else {
      empty = [...Array(totalStars - Math.floor(rating))].map((_, idx) => {
        return idx === 0 ? (
          <BsStarHalf
            key={Math.random()}
            className={`w-[1.43rem] h-[1.43rem] text-[#FFC107]`}
          />
        ) : (
          <BsStarFill
            key={Math.random()}
            className={`w-[1.43rem] h-[1.43rem]
            fill-current text-[#ECEFF1]`}
          />
        );
      });
    }
    return [...filled, ...empty];
  }
  function noOfRatings(num) {
    let filteredReviews = reviews.filter(
      (rev) => Math.round(rev.rating) === num
    );
    return filteredReviews.length;
  }
  return (
    <div className="space-y-6 w-[25%]">
      <div className="space-y-2">
        <div className="flex space-x-2.5 justify-center bg-[#FF385C] p-4 px-8 items-center">
          <div className="flex space-x-1">
            {renderStars(
              reviews.length > 0
                ? reviews.reduce((prev, curr) => {
                    return prev + curr.rating;
                  }, 0) / reviews.length
                : 0
            )}
          </div>
          <div className="font-medium text-2xl">
            {reviews.length > 0
              ? (
                  Math.round(
                    (reviews.reduce((prev, curr) => {
                      return prev + curr.rating;
                    }, 0) /
                      reviews.length) *
                      100
                  ) / 100
                ).toFixed(1)
              : 0}
          </div>
        </div>
        <div className="text-center text-md">({reviews.length}) Reviews</div>
      </div>
      <div className="space-y-2">
        {[...Array(5)].map((_, idx) => {
          let len = 5;
          return (
            <div
              key={idx}
              className="flex font-regular text-[0.78rem] space-x-2.5 items-center"
            >
              <div className="flex-shrink-0">{len - idx} Star</div>
              <div className="w-full relative">
                <div className="w-full h-[2px] rounded-sm relative bg-gray-300"></div>
                <div
                  style={{
                    width: `${(noOfRatings(len - idx) / reviews.length) * 100}%`
                  }}
                  className="h-[2px] absolute top-0 left-0 bg-[#1b1b1b] rounded-sm "
                ></div>
              </div>
              <div>{noOfRatings(len - idx)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomerReviews;
