import React from "react";
import { FiUploadCloud } from "react-icons/fi";

function EditPhoto() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <img
        src="https://d.newsweek.com/en/full/822411/pikachu-640x360-pokemon-anime.jpg?w=1600&h=1600&q=88&f=b65592079ef009b8b80897ddb8660b29"
        className="w-52 rounded-full object-cover"
        alt=""
      />
      <button className="flex space-x-1.5 items-center rounded-sm text-[#FF385C] p-1 px-3 border-[.5px] border-[#FF385C]">
        <FiUploadCloud></FiUploadCloud>
        <span>Edit</span>
      </button>
    </div>
  );
}

export default EditPhoto;
