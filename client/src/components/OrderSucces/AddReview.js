import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";
import { ImSpinner2 } from "react-icons/im";

function AddReview({ adminId, item, notifyToClose }) {
  const [starIdx, setIdx] = useState(-1);
  const [clickedStar, setClickedStar] = useState(-1);
  const { user } = useSelector((state) => {
    return state.user;
  });
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  const [formVal, setformVal] = useState({
    title: "",
    desc: ""
  });
  function ratingName(rating) {
    if (rating === 0) {
      return (
        <span className=" text-red-700 text-xs font-medium">Very Bad</span>
      );
    } else if (rating === 1) {
      return <span className=" text-[#fdb664] text-xs font-medium">Bad</span>;
    } else if (rating === 2) {
      return <span className=" text-green-400 text-xs font-medium">Good</span>;
    } else if (rating === 3) {
      return (
        <span className=" text-green-400 text-xs font-medium">Very Good</span>
      );
    } else if (rating === 4) {
      return (
        <span className=" text-green-400 text-xs font-medium">Excellent</span>
      );
    }
  }

  return (
    <div className="w-2/5 inline-block pl-7 pt-7   border-0 border-l-[1.7px] border-[#e0e0e0] text-left   ml-6">
      {err && <div className=" text-xs mb-1.5 text-red-700">{err}</div>}
      <div className="border-b-[1.7px] pb-3 border-[#e0e0e0]  space-y-1.5 ">
        <div className="text-sm font-medium">Rate this product</div>
        <div
          onMouseLeave={() => {
            setIdx(-1);
          }}
          className="flex space-x-4 items-center"
        >
          <div className="flex space-x-1 items-center">
            {[...Array(5)].map((item, idx) => {
              return (
                <div
                  onMouseEnter={() => {
                    setIdx(idx);
                  }}
                  onClick={() => {
                    setClickedStar(idx);
                  }}
                >
                  {idx <= starIdx || idx <= clickedStar ? (
                    <BsStarFill className=" cursor-pointer fill-current text-[#FFC107]"></BsStarFill>
                  ) : (
                    <BsStarFill className=" cursor-pointer fill-current text-[#e0eaf1]"></BsStarFill>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-xs font-medium">{ratingName(clickedStar)}</div>
        </div>
      </div>
      <div className=" space-y-1.5 pt-3">
        <div className="text-sm font-medium">Review this product</div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (!formVal.desc) {
              return setErr("Description cannot be empty");
            }
            if (clickedStar < 0) {
              return setErr("Provide Rating");
            }
            setLoad(true);
            async function postToDb() {
              try {
                await updateDoc(
                  doc(db, "users", adminId, "productReviews", item.productId),
                  {
                    createdAt: new Date(),
                    reviews: arrayUnion({
                      comment: formVal.desc,
                      id: uuidv4(),
                      createdAt: new Date(),
                      title: formVal.title,
                      rating: clickedStar + 1,
                      likes: [],
                      dislikes: [],
                      product: { ...item },
                      user: {
                        uid: user.uid,
                        name: user.displayName.trim()
                      }
                    })
                  }
                );
                notifyToClose();
              } catch (err) {
                setErr(err.message);
              }
            }
            postToDb().then(() => {
              setLoad(false);
              setformVal({ desc: "", title: "" });
              setClickedStar(-1);
            });
          }}
          className=" space-y-3"
        >
          <div className="flex space-y-1 text-xs flex-col">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => {
                setErr("");
                setformVal((prev) => {
                  return { ...prev, title: e.target.value };
                });
              }}
              value={formVal.title}
              type="text"
              className="outline-none border-[0.5px]  p-1.5 rounded-sm border-[#a8a8a8] "
              placeholder="Title (optional)"
            />
          </div>
          <div className="flex  space-y-1 text-xs flex-col">
            <label htmlFor="desc">Description</label>
            <textarea
              onChange={(e) => {
                setErr("");
                setformVal((prev) => {
                  return { ...prev, desc: e.target.value };
                });
              }}
              value={formVal.desc}
              style={{ resize: "none" }}
              cols={20}
              rows={5}
              className="outline-none border-[0.5px]  p-1.5 rounded-sm border-[#a8a8a8] "
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="flex justify-end ">
            <button
              disabled={load}
              className={`text-sm flex items-center hover:shadow-md  transition-all duration-300 text-white p-1.5 px-4 rounded-sm font-medium ${
                load ? "bg-[#ff5776b4]" : "bg-[#ff385dea]"
              } `}
              type="submit"
            >
              {load && (
                <ImSpinner2 className="animate-spin mr-1.5 w-4 h-4 -ml-2 "></ImSpinner2>
              )}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
