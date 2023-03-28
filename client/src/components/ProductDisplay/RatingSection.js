import React, { useState } from "react";
import Comments from "./Comments";
import CustomerReviews from "./CustomerReviews";

function RatingSection({ reviews }) {
  const [length, setLength] = useState(4);
  return (
    <div>
      <div className="text-2xl font-medium capitalize mb-5">
        Customer Reviews
      </div>
      <div className="flex space-x-32">
        <CustomerReviews reviews={reviews}></CustomerReviews>
        {reviews.length > 0 && (
          <div className="flex-1 space-y-9">
            <div className="space-y-8">
              {reviews.slice(0, length).map((rev, idx) => {
                return rev.comment && rev.title ? (
                  <Comments key={idx} review={rev}></Comments>
                ) : (
                  ""
                );
              })}
            </div>
            {reviews.length > 4 && (
              <div className="cursor-pointer text-center">
                <div
                  onClick={() => {
                    length === reviews.length
                      ? setLength(4)
                      : setLength(reviews.length);
                  }}
                  className="text-sm hover:text-[#FF385C] transition-all duration-150 text-center text-gray-600 inline-block border-b-[1px] border-gray-600 hover:border-[#FF385C]"
                >
                  {length === reviews.length
                    ? "Read Less Reviews"
                    : "Read More Reviews"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RatingSection;
