import React from "react";

function TextArea({ collectValues, formData }) {
  return (
    <div className="mt-4">
      <label className="font-medium text-small" htmlFor="description">
        Description
      </label>
      <textarea
        onChange={(e) => {
          collectValues(e.target.value, "desc");
        }}
        value={formData.desc}
        className="resize-none block mt-2 w-full  h-heightImg border-gray-300 border-[.5px] focus:border-[#FF385C]  focus:outline-none transition-all duration-200 text-small rounded-md py-2 px-2"
      ></textarea>
    </div>
  );
}

export default TextArea;
