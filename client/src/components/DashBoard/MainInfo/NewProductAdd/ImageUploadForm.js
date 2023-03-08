import React from "react";
import ImageUploadBlock from "./ImageUploadBlock";

function ImageUploadForm({ collectValues, setMssg, clear }) {
  return (
    <div className="">
      <div className="font-medium text-small">Product Image</div>
      <div className="mt-2  h-heightImg flex space-x-3">
        <ImageUploadBlock
          clear={clear}
          setMssg={setMssg}
          collectValues={collectValues}
          count={0}
        ></ImageUploadBlock>
        <ImageUploadBlock
          clear={clear}
          setMssg={setMssg}
          collectValues={collectValues}
          count={1}
        ></ImageUploadBlock>
        <div className="flex flex-col space-y-3">
          <ImageUploadBlock
            clear={clear}
            collectValues={collectValues}
            count={2}
            setMssg={setMssg}
            midSize
          ></ImageUploadBlock>
          <ImageUploadBlock
            clear={clear}
            collectValues={collectValues}
            count={3}
            setMssg={setMssg}
            midSize
          ></ImageUploadBlock>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadForm;
