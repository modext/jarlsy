import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { db } from "../../../../services/firebase";
import DetailWrapper from "../DetailWrapper";
import WrapperEdit from "../WrapperEdit";

function ProductModal({ modalDta, user, convertDate, editMode }) {
  const editedValues = useRef([]);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);

  function editVals(value) {
    editedValues.current.push(value);
  }
  useEffect(() => {
    async function updateProducts() {
      setLoading(true);
      let modifiedObj = {};
      editedValues.current.forEach((item, idx) => {
        modifiedObj[item.placeholder] = item.val;
      });

      await updateDoc(
        doc(db, "users", user.uid, "products", modalDta.id),
        modifiedObj
      );
    }
    save &&
      editedValues.current.length > 0 &&
      updateProducts().finally(() => {
        setLoading(false);
      });
  }, [save]);
  return (
    <div className=" flex border-[#dddddd] ">
      <div className="space-y-2 w-[65%] border-r-[1px]  pr-6">
        <DetailWrapper>
          <div className="font-medium mb-2">Product Images:</div>
          <div className="flex  space-x-3 ">
            {modalDta.productImg.map((item, idx) => {
              if (idx >= 2) {
                return null;
              }
              return (
                <img
                  key={idx}
                  className="w-48  bg-gray-100 h-52 rounded-md object-cover"
                  src={item}
                  alt=""
                />
              );
            })}
          </div>
        </DetailWrapper>
        <DetailWrapper>
          <div className="font-medium ">Product Id:</div>
          <div className=" capitalize ">{modalDta.id}</div>
        </DetailWrapper>
        <WrapperEdit
          notifyParentEdit={editVals}
          editMode={editMode}
          values={{
            placeholder: "title",
            params: modalDta.title
          }}
        ></WrapperEdit>
        <WrapperEdit
          notifyParentEdit={editVals}
          editMode={editMode}
          values={{
            placeholder: "brand",
            params: modalDta.brand
          }}
        ></WrapperEdit>
        <WrapperEdit
          notifyParentEdit={editVals}
          editMode={editMode}
          values={{
            placeholder: "description",
            params: modalDta.description
          }}
        ></WrapperEdit>
        <WrapperEdit
          notifyParentEdit={editVals}
          editMode={editMode}
          values={{
            placeholder: "colour",
            params: modalDta.colour
          }}
        ></WrapperEdit>

        <DetailWrapper>
          <div className="font-medium ">Category:</div>
          <div className=" capitalize">{modalDta.category}</div>
        </DetailWrapper>
      </div>
      <div className="flex flex-col flex-1  justify-between ">
        <div className="space-y-1.5   pl-6">
          <DetailWrapper>
            <div className="font-medium ">Style:</div>
            <div className=" capitalize">{modalDta.style}</div>
          </DetailWrapper>
          <DetailWrapper>
            <div className="font-medium ">Pattern:</div>
            <div className=" capitalize">{modalDta.pattern}</div>
          </DetailWrapper>
          <DetailWrapper>
            <div className="font-medium ">Product For:</div>
            <div className=" capitalize">{modalDta.for}</div>
          </DetailWrapper>{" "}
          <DetailWrapper>
            <div className="font-medium ">CreatedAt:</div>
            <div>{convertDate(modalDta.createdAt.seconds)}</div>
          </DetailWrapper>
          <DetailWrapper>
            <div className="font-medium ">Made With:</div>
            <div className=" capitalize">{modalDta.madewith}</div>
          </DetailWrapper>
          <DetailWrapper>
            <div className="font-medium ">sizes:</div>
            <div className="flex space-x-2.5 my-1.5">
              {modalDta.size.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`
                 border-[.7px] hover:bg-[#000000] hover:border-white hover:text-white  transition-all duration-150 px-2 py-0.5 cursor-pointer border-black capitalize select-none text-xs rounded-sm
              `}
                  >
                    {item.elem.startsWith("X") ||
                    item.elem.startsWith("3") ||
                    item.elem.startsWith("4")
                      ? item.elem === "X-Large" || item.elem === "X-Small"
                        ? item.elem
                            .split("")
                            .filter((el) => el !== "-")
                            .slice(0, 2)
                        : item.elem
                            .split("")
                            .filter((el) => el !== "-")
                            .slice(0, 3)
                      : item.elem.slice(0, 1)}
                  </div>
                );
              })}
            </div>
          </DetailWrapper>
          <div className="relative top-0.5">
            <WrapperEdit
              notifyParentEdit={editVals}
              editMode={editMode}
              values={{
                placeholder: "instock",
                params: modalDta.inStock
              }}
            ></WrapperEdit>
          </div>
          <WrapperEdit
            notifyParentEdit={editVals}
            editMode={editMode}
            values={{
              placeholder: "price",
              params: `$${(+modalDta.prize).toFixed(2)}`
            }}
          ></WrapperEdit>
          <DetailWrapper>
            <div className="font-medium ">Sold:</div>
            <div>{modalDta.adminInfo.sold}</div>
          </DetailWrapper>
          <DetailWrapper>
            <div className="font-medium ">Revenue:</div>
            <div>${modalDta.adminInfo.revenue.toFixed(2)}</div>
          </DetailWrapper>
        </div>
        {editMode && (
          <div className="flex   justify-end ">
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
      </div>
    </div>
  );
}

export default ProductModal;
