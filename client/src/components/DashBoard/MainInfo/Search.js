import React from "react";
import { ReactComponent as SearchIcon } from "../../../icons/search.svg";
function Search({ section }) {
  return (
    <div className="flex group  items-center mr-2.5">
      <SearchIcon className="w-5 h-5 fill-current  relative z-20 -mr-8"></SearchIcon>
      <input
        type="text"
        placeholder="Search"
        className={`py-2  shadow-sm group-hover:w-80 pl-10 rounded-md placeholder-[#4e4e4e7c] text-md font-regular w-72 transition-all duration-300  ${
          section === "nav" ? "bg-white" : "bg-gray-100"
        }  focus:outline-none`}
      />
    </div>
  );
}

export default Search;
