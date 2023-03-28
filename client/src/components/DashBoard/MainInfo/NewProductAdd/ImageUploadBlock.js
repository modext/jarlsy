import React, { useEffect, useState } from "react";
import { IoImageOutline } from "react-icons/io5";

function ImageUploadBlock({ setMssg, clear, midSize, count, collectValues }) {
  const [selectedImage, setImg] = useState("");
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  useEffect(() => {
    if (clear && selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setImg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  const handleChange = (e) => {
    let file = e.target.files;

    if (!file || file.length === 0 || file[0].size > 10524814) {
      setMssg("File size should not be larger than 10mb");
      return;
    }
    const previewFile = URL.createObjectURL(file[0]);
    setImg(previewFile);
    collectValues(file[0], "IMG_UPLOAD");
  };

  return (
    <div className={`relative ${midSize ? "h-1/2" : ""} cursor-pointer`}>
      <label
        htmlFor={`img${count}`}
        className="absolute top-0 z-50 rounded-md cursor-pointer left-0 w-full h-full"
      ></label>
      {selectedImage && (
        <img
          className="absolute rounded-md top-0 z-50 object-cover cursor-pointer left-0 w-full h-full"
          src={selectedImage}
          alt=""
        />
      )}
      <div className=" w-widthImg h-full rounded-md  border-[.5px] border-[#FF385C] border-dashed bg-gray-50"></div>
      <div
        className={`text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max ${
          midSize ? "text-sm" : "text-small"
        }  text-center`}
      >
        <IoImageOutline
          className={`${midSize ? "w-6 h-6" : " w-7 h-7"} mb-1.5 inline-block`}
        ></IoImageOutline>
        <input
          type="file"
          id={`img${count}`}
          className="hidden"
          onChange={handleChange}
        />
        <div>Click to Browse</div>
      </div>
    </div>
  );
}

export default ImageUploadBlock;
