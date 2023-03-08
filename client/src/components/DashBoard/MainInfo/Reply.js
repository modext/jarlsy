import React, { useEffect, useRef } from "react";

function Reply({ closeReply, setReply, setEdit, editMode, prevValue, idx }) {
  const inputRef = useRef("");

  useEffect(() => {
    if (editMode) {
      inputRef.current.value = prevValue;
    }
  }, [editMode, prevValue]);

  return (
    <div className="flex space-x-2 items-center mt-2">
      <div>
        <img
          src="/img/dashboard/profile.jpeg"
          className="w-6 h-6 object-cover rounded-full"
          alt=""
        />
      </div>
      <input
        ref={inputRef}
        className="flex-1 duration-300 p-0.5 group-hover:bg-[#f5f5f5] border-b-[1px] border-gray-400 text-sm  focus:outline-none bg"
        type="text"
        placeholder="Add a reply"
      />
      <div className="text-xs space-x-2">
        <button
          onClick={() => {
            closeReply(false);
            editMode && setEdit(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setReply({ value: inputRef.current.value, date: +new Date(), idx });
            closeReply(false);
            editMode && setEdit(false);
          }}
          className="p-1 text-white rounded-sm bg-[#FF385C]"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default Reply;
