/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmile, BsEmojiSmileFill } from "react-icons/bs";
import { MdAttachFile, MdCancel } from "react-icons/md";
import { IoMdPaperPlane, IoIosPaperPlane } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

function SendInput({ messageSubmit, user }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [message, setMessageInp] = useState("");
  const [tooltip, setToolTip] = useState("");
  const [filestoSubmit, setFilesToSubmit] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);

  function getSelectedEmoji(_, emojiObj) {
    setMessageInp((prev) => {
      return prev.concat(emojiObj.emoji);
    });
    tooltip && setToolTip("");
  }

  function deleteImage(name) {
    let newFiles = selectedFile.filter((file, _) => {
      if (file.name === name) {
        URL.revokeObjectURL(file.url);
        return false;
      }
      return true;
    });
    setSelectedFile(newFiles);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message && filestoSubmit.length === 0) {
      setToolTip("Type a Message");
      return;
    }
    if (filestoSubmit.length > 0) {
      messageSubmit(
        {
          name: user.displayName,
          userId: user.uid,
          text: message,
          message: [...filestoSubmit],
          timestamp: new Date(),
          messageId: uuidv4()
        },
        [...selectedFile]
      );
    } else {
      messageSubmit({
        name: user.displayName,
        userId: user.uid,
        message,
        timestamp: new Date(),
        messageId: uuidv4()
      });
    }

    setSelectedFile([]);
    setFilesToSubmit([]);
    setMessageInp("");
    showEmoji && setShowEmoji(!showEmoji);
  };

  function bytesToSize(bytes, seperator = "") {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
  }

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || files.size > 12312654) {
      return;
    }
    const previewFile = {
      url: URL.createObjectURL(files[0]),
      type: files[0].type,
      name: files[0].name,
      size: bytesToSize(files[0].size)
    };

    setFilesToSubmit((prev) => {
      return [
        ...prev,
        new File([files[0]], files[0].name, { type: files[0].type })
      ];
    });
    setSelectedFile((prev) => {
      return [...prev, { ...previewFile }];
    });
    tooltip && setToolTip("");
    showEmoji && setShowEmoji(!showEmoji);
  };

  return (
    <div
      className={`px-3 py-2 ${
        selectedFile.length > 0 && "border-t-[.5px] "
      } relative`}
    >
      <div className={`${selectedFile.length > 0 && "mb-1 space-x-3"}`}>
        {selectedFile.map((file, idx) => {
          return file.type === "application/pdf" ? (
            <div key={idx} className="relative inline-block">
              <div
                onClick={() => {
                  deleteImage(file.name);
                }}
                className="absolute -top-1.5 cursor-pointer -right-1.5"
              >
                <MdCancel className="text-gray-500"></MdCancel>
              </div>
              <a
                href={file.url}
                className="cursor-pointer top-0 left-0 absolute w-16 h-16 inline-block "
                download={file.name}
                target="page"
              ></a>
              <iframe
                title="pdf"
                className="w-16 h-16 rounded-sm overflow-hidden object-cover"
                src={file.url}
                name="page"
              />
            </div>
          ) : (
            <div key={idx} className="inline-block relative">
              <div
                onClick={() => {
                  deleteImage(file.name);
                }}
                className="absolute -top-1.5 cursor-pointer -right-1.5"
              >
                <MdCancel className="text-gray-500"></MdCancel>
              </div>
              <a
                href={file.url}
                key={idx}
                className="cursor-pointer  w-16 h-16 inline-block "
                download={file.name}
              >
                <img
                  className="w-16 h-16 object-cover rounded-sm"
                  alt=""
                  src={file.url}
                />
              </a>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        {tooltip && (
          <div className="absolute rounded-sm bg-gray-50 p-2 -top-8 slideup translate-y-7 opacity-0 left-3 shadow-sm_dark text-xs">
            {tooltip}
          </div>
        )}
        <textarea
          rows={1}
          cols={20}
          onChange={(e) => {
            setMessageInp(e.target.value);
            setToolTip("");
          }}
          type="text"
          value={message}
          className="rounded-md   pr-44 transition-all duration-300 border-[.5px] p-2.5 w-full focus:border-[#FF385C] focus:outline-none bg-gray-100 text-sm  border-gray-200"
          placeholder="Type Here"
        />
        <div className="flex  absolute bottom-[16.4px] right-[13px] items-center space-x-3">
          <div
            onClick={() => {
              setShowEmoji((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            {showEmoji ? (
              <BsEmojiSmileFill className="w-5 h-5 text-gray-500 animplane opacity-50"></BsEmojiSmileFill>
            ) : (
              <BsEmojiSmile className="w-5 h-5 animplane opacity-50 text-gray-500"></BsEmojiSmile>
            )}
          </div>
          <div className="cursor-pointer">
            <input
              id="file"
              type="file"
              multiple
              onChange={handleChange}
              className="hidden"
            />
            <label htmlFor="file">
              <MdAttachFile className="w-5  cursor-pointer h-5 text-gray-500"></MdAttachFile>
            </label>
          </div>
          <button
            onMouseEnter={() => {
              setHoverBtn(true);
            }}
            onMouseLeave={() => {
              setHoverBtn(false);
            }}
            className="text-sm flex items-center space-x-1.5 bg-[#FF385C] rounded-md text-white py-2.5 px-5"
          >
            <div className="font-medium">Send</div>
            {hoverBtn ? (
              <IoIosPaperPlane className="animplane opacity-50 w-5 h-5"></IoIosPaperPlane>
            ) : (
              <IoMdPaperPlane className="animplane opacity-50 w-5 h-5"></IoMdPaperPlane>
            )}
          </button>
        </div>
      </form>
      {showEmoji && (
        <div
          className={`absolute right-0 ${
            selectedFile.length > 0 ? "bottom-16" : "bottom-full"
          } `}
        >
          <Picker disableSearchBar={true} onEmojiClick={getSelectedEmoji} />
        </div>
      )}
    </div>
  );
}

export default SendInput;
