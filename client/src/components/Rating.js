import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

function Rating({ reviews, big }) {
  function renderStars(rating, big) {
    let totalStars = 5;
    let filled = [...Array(Math.floor(rating))].map((_, idx) => {
      return (
        <BsStarFill
          key={Math.random()}
          className="w-3.5 h-3.5 fill-current text-[#FFC107]"
        />
      );
    });
    let empty = [];
    if (rating % 1 === 0) {
      empty = [...Array(totalStars - rating)].map((_, idx) => (
        <BsStarFill
          key={Math.random()}
          className={`${
            big ? "w-4 h-4" : "w-3.5 h-3.5"
          } fill-current text-[#ECEFF1]`}
        />
      ));
    } else {
      empty = [...Array(totalStars - Math.floor(rating))].map((_, idx) => {
        return idx === 0 ? (
          <BsStarHalf
            key={Math.random()}
            className={`${big ? "w-4 h-4" : "w-3.5 h-3.5"} text-[#FFC107]`}
          />
        ) : (
          <BsStarFill
            key={Math.random()}
            className={`${
              big ? "w-4 h-4" : "w-3.5 h-3.5"
            } fill-current text-[#ECEFF1]`}
          />
        );
      });
    }
    return [...filled, ...empty];
  }
  return (
    <div className="flex space-x-1.5 items-center">
      <div className="flex space-x-0.5">
        {renderStars(
          reviews.length > 0
            ? reviews.reduce((prev, curr) => {
                return prev + curr.rating;
              }, 0) / reviews.length
            : 0,
          big
        )}
      </div>
      <div className={`select-none text-[${big ? "13px" : "11px"}]`}>
        ({reviews.length})
      </div>
    </div>
  );
}

export default Rating;
