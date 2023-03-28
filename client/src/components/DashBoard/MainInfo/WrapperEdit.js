import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import DetailWrapper from "./DetailWrapper";

function WrapperEdit({
  values: { placeholder, params },
  notifyParentEdit = null,
  editMode
}) {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(params);
  const firstRender = useRef(false);
  useEffect(() => {
    if (!edit && firstRender.current && val !== params) {
      notifyParentEdit({
        placeholder: placeholder === "instock" ? "inStock" : placeholder,
        val
      });
    }
    firstRender.current = true;
  }, [edit]);
  return (
    <div className="flex space-x-5 justify-between ">
      <div className="flex-1">
        <DetailWrapper>
          <div className="font-medium capitalize ">{placeholder}:</div>
          {edit ? (
            <div>
              <input
                type="text"
                className="py-0.5 px-1 mt-0.5 outline-none rounded-sm text-sm w-full border-[0.5px] capitalize border-[#000]"
                placeholder={placeholder}
                onChange={(e) => {
                  setVal(e.target.value);
                }}
                value={val}
              />
            </div>
          ) : (
            <div className=" capitalize ">{val}</div>
          )}
        </DetailWrapper>
      </div>
      {editMode && (
        <div
          onClick={() => {
            setEdit((prev) => !prev);
          }}
          className=" self-start cursor-pointer"
        >
          <AiFillEdit></AiFillEdit>
        </div>
      )}
    </div>
  );
}

export default WrapperEdit;
