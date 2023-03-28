import React, { useEffect } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { ReactComponent as ThumbsFilled } from "../../icons/thumbs2.svg";
import { useState } from "react";
import { ReactComponent as ThumbsOutline } from "../../icons/thumbs1.svg";
import { useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";

function Comments({
  review: { likes, dislikes, comment, rating, title, user, createdAt, reply }
}) {
  const { user: mainUser } = useSelector((state) => state.user);
  const [dropdownAct, setdropdownAct] = useState(false);
  const [interaction, setInteraction] = useState({
    likesInter: { likes: likes.length, liked: false },
    dislikesInter: { dislikes: dislikes.length, disliked: false }
  });
  useEffect(() => {
    if (mainUser) {
      let foundLiked = likes.find((item) => {
        return item === mainUser.uid;
      });
      let foundDisLiked = likes.find((item) => {
        return item === mainUser.uid;
      });
      if (foundLiked) {
        setInteraction((prev) => {
          return {
            ...prev,
            likesInter: {
              likes: prev.likesInter.likes,
              liked: true
            }
          };
        });
        return;
      }
      if (foundDisLiked) {
        setInteraction((prev) => {
          return {
            ...prev,
            dislikesInter: {
              dislikes: prev.dislikesInter.dislikes,
              disliked: true
            }
          };
        });
        return;
      }
    }
  }, [mainUser]);

  function renderStars(rating) {
    let totalStars = 5;
    let filled = [...Array(Math.floor(rating))].map((_) => {
      return (
        <BsStarFill
          key={Math.random()}
          className="w-[.9rem] h-[.9rem] fill-current text-[#FFC107]"
        />
      );
    });
    let empty = [];
    if (rating % 1 === 0) {
      empty = [...Array(totalStars - rating)].map((_, idx) => (
        <BsStarFill
          key={Math.random()}
          className={`w-[.9rem] h-[.9rem] fill-current text-[#ECEFF1]`}
        />
      ));
    } else {
      empty = [...Array(totalStars - Math.floor(rating))].map((_, idx) => {
        return idx === 0 ? (
          <BsStarHalf
            key={Math.random()}
            className={`w-[.9rem] h-[.9rem] text-[#FFC107]`}
          />
        ) : (
          <BsStarFill
            key={Math.random()}
            className={`w-[.9rem] h-[.9rem]
                fill-current text-[#ECEFF1]`}
          />
        );
      });
    }
    return [...filled, ...empty];
  }
  function convertDate(sec) {
    let date = new Date(sec * 1000);
    return `${date.toLocaleString("default", {
      month: "long"
    })} ${date.getDate()}, ${date.getFullYear()}`;
  }
  console.log(reply);
  return (
    <>
      <div className="space-y-2">
        <div className="font-medium text-lg">{title}</div>
        <div className="flex space-x-1 relative -top-1">
          {renderStars(rating)}
        </div>
        <div className="font-regular text-small">{comment}</div>
        <div className="flex text-sm text-[#797979]">
          <div>
            <span className="capitalize">{user.name}</span>
            <span className="inline-block mx-1">|</span>
          </div>
          <div>
            <span>{convertDate(createdAt.seconds)}</span>
            <span className="inline-block mx-1">|</span>
          </div>
          <div>
            <span>Verified Purchaser</span>
            <span className="inline-block mx-1">|</span>
          </div>
          <div>Incentivised Review</div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="font-regular text-sm">Helpful?</div>
          <div className="flex space-x-1 items-center">
            <div
              onClick={() => {
                setInteraction((prev) => {
                  if (!prev.likesInter.liked) {
                    return {
                      dislikesInter: prev.dislikesInter.disliked
                        ? {
                            dislikes: prev.dislikesInter.dislikes - 1,
                            disliked: !prev.dislikesInter.disliked
                          }
                        : { ...prev.dislikesInter },
                      likesInter: {
                        likes: prev.likesInter.likes + 1,
                        liked: !prev.likesInter.liked
                      }
                    };
                  } else {
                    return {
                      ...prev,
                      likesInter: {
                        likes: prev.likesInter.likes - 1,
                        liked: !prev.likesInter.liked
                      }
                    };
                  }
                });
              }}
              className="cursor-pointer space-x-0.5 flex items-center"
            >
              <div>
                {interaction.likesInter.liked ? (
                  <ThumbsFilled className="w-4  h-4" />
                ) : (
                  <ThumbsOutline className="w-4 fill-current h-4" />
                )}
              </div>
              <div className="text-[13px]">{interaction.likesInter.likes}</div>
            </div>
            <div
              onClick={() => {
                setInteraction((prev) => {
                  if (!prev.dislikesInter.disliked) {
                    return {
                      likesInter: prev.likesInter.liked
                        ? {
                            likes: prev.likesInter.likes - 1,
                            liked: !prev.likesInter.liked
                          }
                        : { ...prev.likesInter },
                      dislikesInter: {
                        dislikes: prev.dislikesInter.dislikes + 1,
                        disliked: !prev.dislikesInter.disliked
                      }
                    };
                  } else {
                    return {
                      ...prev,
                      dislikesInter: {
                        dislikes: prev.dislikesInter.dislikes - 1,
                        disliked: !prev.dislikesInter.disliked
                      }
                    };
                  }
                });
              }}
              className="cursor-pointer space-x-0.5 flex items-center"
            >
              <div>
                {interaction.dislikesInter.disliked ? (
                  <ThumbsFilled className="w-4 tr fill-current  h-4" />
                ) : (
                  <ThumbsOutline className="w-4 tr fill-current  h-4" />
                )}
              </div>
              <div className="text-[13px]">
                {interaction.dislikesInter.dislikes}
              </div>
            </div>
          </div>
        </div>
        <div>
          {reply && (
            <div
              onClick={() => {
                setdropdownAct((prev) => !prev);
              }}
              className="font-medium flex items-center text-xs text-[#FF385C] cursor-pointer"
            >
              <div>View Reply</div>
              {!dropdownAct ? (
                <IoMdArrowDropdown className="w-4 h-4" />
              ) : (
                <IoMdArrowDropdown className="w-4  rotate-180 h-4" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className=" ml-5 relative bottom-4">
        {reply && dropdownAct && (
          <div className=" flex items-start space-x-2">
            <div className=" flex-shrink-0 ">
              <img
                src="/img/dashboard/profile.jpeg"
                className="w-7 rounded-full object-cover h-7"
                alt=""
              />
            </div>
            <div className=" space-y-2">
              <div className="font-regular capitalize text-sm">
                {reply.replyComment.comment}
              </div>
              <div className="flex text-xs text-[#797979]">
                <div>
                  <span className="capitalize">{reply.replyComment.admin}</span>
                  <span className="inline-block mx-1">|</span>
                </div>
                <div>
                  <span>{convertDate(reply.timestamp.seconds)}</span>
                  <span className="inline-block mx-1">|</span>
                </div>
                <div>
                  <span>Store Owner</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
