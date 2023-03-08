import React, { useState } from "react";

function Icons(props) {
  const [filledIcon, changeIcon] = useState(false);
  return (
    <li
      onMouseEnter={() => {
        changeIcon(() => {
          return true;
        });
      }}
      onMouseLeave={() => {
        changeIcon(() => {
          return false;
        });
      }}
    >
      {filledIcon || props.parentHover || props.expand ? (
        <props.filledicon className="w-3.5 h-3.5 text-[#FF385C] lg:w-7 lg:h-7  cursor-pointer "></props.filledicon>
      ) : (
        <props.icon className="w-3.5 h-3.5 lg:w-7 lg:h-7  cursor-pointer "></props.icon>
      )}
    </li>
  );
}

export default Icons;
