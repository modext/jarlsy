import React, { useState } from "react";
import Info from "./Info";
import LikeDislike from "./LikeDislike";
import Reply from "./Reply";
import CustomerReviews from "../../ProductDisplay/CustomerReviews";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

function Review({ data, setReply, setEngagement, setDelete }) {
  const [replySec, setReplySec] = useState(false);
  const [edit, setEdit] = useState(false);

  function convertDate(sec) {
    let date = new Date(sec * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1 > 9
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    }/${date.getFullYear()}`;
  }
  function renderStars(rating, big) {
    let totalStars = 5;
    let filled = [...Array(Math.floor(rating))].map((_, idx) => {
      return (
        <BsStarFill
          key={Math.random()}
          className="w-3 h-3 fill-current text-[#FFC107]"
        />
      );
    });
    let empty = [];
    if (rating % 1 === 0) {
      empty = [...Array(totalStars - rating)].map((_, idx) => (
        <BsStarFill
          key={Math.random()}
          className={`${
            big ? "w-4 h-4" : "w-3 h-3"
          } fill-current text-[#ECEFF1]`}
        />
      ));
    } else {
      empty = [...Array(totalStars - Math.floor(rating))].map((_, idx) => {
        return idx === 0 ? (
          <BsStarHalf
            key={Math.random()}
            className={`${big ? "w-4 h-4" : "w-3 h-3"} text-[#FFC107]`}
          />
        ) : (
          <BsStarFill
            key={Math.random()}
            className={`${
              big ? "w-4 h-4" : "w-3 h-3"
            } fill-current text-[#ECEFF1]`}
          />
        );
      });
    }
    return [...filled, ...empty];
  }
  function setEditPhase(val) {
    setEdit(val);
    setReplySec(true);
  }

  return (
    <div className="flex w-full items-center">
      <div className="w-full">
        <div
          className={`flex w-full ${
            data.reply
              ? "after:top-0 after:left-5 after:z-20 after:h-[90%] after:w-[.5px] after:bg-gray-300 after:absolute "
              : ""
          }  relative  space-x-5 `}
        >
          <img
            className="w-10 h-10 relative z-30  rounded-full object-cover"
            src="/img/dashboard/profile.jpeg"
            alt=""
          />

          <div className=" w-full">
            <div className="flex items-center space-x-2">
              <div className="font-medium capitalize">{data.user.name}</div>
              <div className="text-xs">
                {convertDate(data.createdAt.seconds)}
              </div>
              <div className="flex space-x-0.5 items-center">
                {renderStars(data.rating)}
              </div>
            </div>

            <div className="text-sm  inline-block">{data.comment}</div>
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => {
                  setReplySec((prev) => {
                    return !prev;
                  });
                }}
                className="text-xs mt-1.5 text-[#4e4e4e]"
              >
                Reply
              </button>
              <LikeDislike
                idx={data.id}
                engageMent={{
                  likes: data.likes,
                  dislikes: data.dislikes
                }}
                setEngagement={setEngagement}
              ></LikeDislike>
            </div>
            {((replySec && !data.reply) || (edit && data.reply)) && (
              <Reply
                closeReply={setReplySec}
                editMode={edit}
                setEdit={setEdit}
                idx={data.id}
                prevValue={edit && data.reply.replyComment.comment}
                setReply={setReply}
              ></Reply>
            )}
            {data.reply && !edit && (
              <div className="flex items-start  justify-between">
                <div className="flex mt-3.5 relative after:absolute after:top-1/2 after:-left-10 after:w-12 after:h-[.5px]  after:z-20 after:bg-gray-300 space-x-2 ">
                  <img
                    className="w-10 z-30 h-10 rounded-full object-cover"
                    src="/img/dashboard/profile.jpeg"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="font-medium  capitalize">
                        {data.reply.replyComment.admin}
                      </div>
                      <div className="text-xs">
                        {convertDate(
                          data.reply.timestamp.seconds
                            ? data.reply.timestamp.seconds
                            : data.reply.timestamp.getTime() / 1000
                        )}
                      </div>
                    </div>
                    <div className=" text-sm inline-block ">
                      <span className="text-blue-500">@{data.user.name} </span>
                      {data.reply.replyComment.comment}
                    </div>
                  </div>
                </div>

                <Info
                  type="User Reply"
                  setDelete={setDelete}
                  setEditPhase={setEditPhase}
                ></Info>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
