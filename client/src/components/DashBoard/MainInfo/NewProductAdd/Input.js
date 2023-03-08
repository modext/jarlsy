import React from "react";

function Input({ getAllValues = null, value, placeholder, id, type = "text" }) {
  return (
    <input
      onChange={(e) => {
        getAllValues && getAllValues(e.target.value, id);
      }}
      type={type}
      value={value}
      className="block w-full border-gray-300 border-[.5px] focus:border-[#FF385C] mt-2 focus:outline-none transition-all duration-200 text-small rounded-md py-2 px-2"
      id={id}
      placeholder={placeholder}
    />
  );
}

export default Input;
