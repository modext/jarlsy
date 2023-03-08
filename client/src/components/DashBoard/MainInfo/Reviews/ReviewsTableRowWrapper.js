import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../services/firebase";
import ReviewsTableRow from "./ReviewsTableRow";

function ReviewsTableRowWrapper({ setReload, admin, tableData }) {
  let firstRender = useRef(false);
  const [data, setData] = useState(
    [...tableData.reviews].sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    )
  );
  const [removed, setRemoved] = useState(false);
  function setReply(value) {
    setData((prev) => {
      const updateData = prev.map((item, idx) => {
        if (item.id === value.idx) {
          return {
            ...item,
            reply: {
              replyComment: { comment: value.value, admin: admin.name },
              timestamp: new Date()
            }
          };
        }
        return item;
      });

      return updateData;
    });
    removeArrayDb().then(() => setRemoved(true));
  }

  async function removeArrayDb() {
    try {
      let promises = [];
      data.forEach((element) => {
        promises.push(
          updateDoc(
            doc(db, "users", admin.uid, "productReviews", tableData.id),
            {
              reviews: arrayRemove(element)
            }
          )
        );
      });
      await Promise.all(promises);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    async function update() {
      try {
        await updateDoc(
          doc(db, "users", admin.uid, "productReviews", tableData.id),
          {
            reviews: arrayUnion(...data)
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    firstRender.current &&
      removed &&
      update().finally((_) => {
        setRemoved(false);
        // setReload(true);
      });
    firstRender.current = true;
  }, [removed]);

  function foundIn(arr, inc) {
    let found = arr.find((item) => item === admin.uid);
    if (found) {
      return arr.filter((el) => el !== admin.uid);
    }
    return !inc ? arr : [...arr, admin.uid];
  }

  function setEngagement(value) {
    setData((prev) => {
      const updateData = prev.map((item, idx) => {
        if (item.id === value.idx) {
          if (value.type === "Like") {
            return {
              ...item,
              dislikes: foundIn(item.dislikes, false),
              likes: foundIn(item.likes, true)
            };
          }
          if (value.type === "Dislike") {
            return {
              ...item,
              likes: foundIn(item.likes, false),
              dislikes: foundIn(item.dislikes, true)
            };
          }
        }
        return item;
      });

      return updateData;
    });
    removeArrayDb().then(() => setRemoved(true));
  }

  function setDelete(idx, full = undefined) {
    !full
      ? setData((prev) => {
          let filtered = prev.map((item, id) => {
            return item.id === idx
              ? {
                  comment: item.comment,
                  createdAt: item.createdAt,
                  dislikes: [...item.dislikes],
                  likes: [...item.likes],
                  product: { ...item.product },
                  rating: item.rating,
                  id: item.id,
                  title: item.title,
                  user: { ...item.user }
                }
              : { ...item };
          });
          return filtered;
        })
      : setData((prev) => {
          let filtered = prev.filter((item, id) => {
            return item.id !== idx;
          });
          console.log(filtered, idx);
          return filtered;
        });
    removeArrayDb().then(() => setRemoved(true));
  }

  return (
    <div className="border-l-[1px]   border-[#ff385dc4] rounded-sm">
      <div className=" space-y-2">
        {data.map((review, idx) => {
          return (
            <ReviewsTableRow
              type="reviews"
              key={idx}
              setDelete={setDelete}
              setReply={setReply}
              setEngagement={setEngagement}
              tableData={review}
            ></ReviewsTableRow>
          );
        })}
      </div>

      <div className=" bg-[#ff385d5e] shadow-sm_dark last:bg-white my-1 w-full  py-[0.5px]"></div>
      {data.length > 7 && (
        <div className=" text-center ">
          <button className="text-xs after:bg-black relative after:top-[105%] after:left-0 after:absolute after:w-full after:h-[1px] hover:after:bg-[#FF385C] my-2 hover:text-[#FF385C]">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewsTableRowWrapper;
