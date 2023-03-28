import React, { useEffect, useState } from "react";
import DetailWrapper from "../DetailWrapper";
import { ImSpinner2 } from "react-icons/im";
import { MdArrowDropDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../services/firebase";

function OrderModal({ modalDta, notifyParent, editMode, convertDate }) {
  const [selected, setSelected] = useState(modalDta.status);
  const [dropdown, setDropDown] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function updateCorresUser() {
      setLoading(true);
      try {
        let res = await getDoc(
          doc(
            db,
            "users",
            modalDta.userOrderedId,
            "orders",
            modalDta.correspondingSession
          )
        );

        let modifiedtems = res.data().orderedItems.map((item) => {
          if (item.prId === modalDta.itemId && item.adId === user.uid) {
            return { ...item, orderStatus: selected };
          }
          return item;
        });
        await updateDoc(
          doc(db, "users", user.uid, "incomingOrders", modalDta.itemId),
          {
            status: selected
          }
        );
        if (selected === "Delivered") {
          let adminRes = await getDoc(
            doc(db, "users", user.uid, "productsAdminInfo", modalDta.itemId)
          );
          let modifiedObj = {
            revenue: adminRes.data().revenue + modalDta.prize,
            sold: adminRes.data().sold + modalDta.qty
          };
          await updateDoc(
            doc(db, "users", user.uid, "productsAdminInfo", modalDta.itemId),
            modifiedObj
          );
          await updateDoc(
            doc(db, "users", user.uid, "products", modalDta.itemId),
            {
              inStock: +modalDta.details.inStock - modalDta.qty
            }
          );
        }
        await updateDoc(
          doc(
            db,
            "users",
            modalDta.userOrderedId,
            "orders",
            modalDta.correspondingSession
          ),
          {
            orderedItems: modifiedtems
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    if (save) {
      updateCorresUser().finally((_) => {
        setLoading(false);
        notifyParent();
      });
    }
  }, [save]);

  return (
    <>
      <div className="space-y-1.5  border-[#dddddd] ">
        <DetailWrapper>
          <div className="font-medium ">Order No:</div>
          <div>{modalDta.id}</div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium">Name :</div>
          <div>{modalDta.name}</div>
        </DetailWrapper>

        <DetailWrapper>
          <div className="font-medium">Shipping Address: </div>
          <div>
            <div>Postal Code: {modalDta.shipping.postal_code}</div>
            <div className=" ">Country: {modalDta.shipping.country}</div>
            <div className=" capitalize ">
              City: {modalDta.shipping.city.toLowerCase()}
            </div>
            <div className=" capitalize ">
              Address:{" "}
              {(
                modalDta.shipping.line1 || modalDta.shipping.line2
              ).toLowerCase()}
            </div>
          </div>
        </DetailWrapper>

        <DetailWrapper>
          <div className="font-medium">Payment Status :</div>
          <div className=" capitalize">{modalDta.payment_status}</div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium">Order Status :</div>

          <div className=" relative capitalize">
            <div
              onClick={() => {
                setDropDown((prev) => !prev);
              }}
              className={`${editMode && `cursor-pointer`} flex items-center`}
            >
              <div className={`${editMode && `text-[#FF385C]`}`}>
                {selected}
              </div>
              {editMode && (
                <MdArrowDropDown
                  className={`w-5 -ml-0.5  fill-current text-[#3f3f3f] ${
                    dropdown && "rotate-180"
                  } h-5`}
                ></MdArrowDropDown>
              )}
            </div>
            {editMode && dropdown && (
              <div className="absolute w-32 top-[108%] rounded-md bg-white  shadow-sm_dark ">
                {["Pending", "Shipped", "Out for Delivery", "Delivered"].map(
                  (el, idx) => {
                    if (selected === el) {
                      return null;
                    }
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelected(el);
                          setDropDown(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {el}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium ">Product Name:</div>
          <div className={`capitalize`}>
            {modalDta.details.title.toLowerCase()}
          </div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium ">Product Brand:</div>
          <div className=" capitalize">
            {modalDta.details.brand.toLowerCase()}
          </div>
        </DetailWrapper>
        {!editMode && (
          <DetailWrapper>
            <div className="font-medium ">Product Colour:</div>
            <div className=" capitalize">
              {modalDta.details.colour.toLowerCase()}
            </div>
          </DetailWrapper>
        )}
        <DetailWrapper>
          <div className="font-medium">Date Ordered :</div>
          <div>{convertDate(modalDta.timestamp.seconds)}</div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium">Quantity Ordered :</div>
          <div>{modalDta.qty}</div>
        </DetailWrapper>

        <DetailWrapper>
          <div className="font-medium">Item Price :</div>
          <div>
            ${(Math.round(modalDta.details.prize * 100) / 100).toFixed(2)}
          </div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium">Shipping :</div>
          <div>$5.99</div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium">Total Price :</div>
          <div>
            $
            {(
              Math.round(modalDta.details.prize * modalDta.qty * 100) / 100 +
              5.99
            ).toFixed(2)}
          </div>
        </DetailWrapper>
      </div>
      {editMode && (
        <div className="flex  justify-end ">
          <button
            onClick={() => {
              setSave(true);
            }}
            disabled={loading}
            className={`text-sm flex items-center space-x-1  rounded-sm hover:shadow-sm_dark transition-all duration-150 ${
              loading ? "bg-[#ff385d94]" : "bg-[#FF385C]"
            }  mt-0 text-white px-3 py-1 justify-center  font-medium`}
          >
            {loading && (
              <ImSpinner2 className="animate-spin w-3 h-3 -ml-2 "></ImSpinner2>
            )}
            <div>Save</div>
          </button>
        </div>
      )}
    </>
  );
}

export default OrderModal;
