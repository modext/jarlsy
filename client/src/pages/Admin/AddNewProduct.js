import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageUploadForm from "../../components/DashBoard/MainInfo/NewProductAdd/ImageUploadForm";
import NewProductForm from "../../components/DashBoard/MainInfo/NewProductAdd/NewProductForm";
import SubmitButtons from "../../components/DashBoard/MainInfo/NewProductAdd/SubmitButtons";
import TextArea from "../../components/DashBoard/MainInfo/NewProductAdd/TextArea";

function AddNewProduct() {
  const [formData, setFormData] = useState({ images: [], desc: "" });
  const [mssg, setMssg] = useState("");
  const [clear, setClear] = useState(false);
  function clearForm() {
    setClear(true);
  }

  useEffect(() => {
    if (clear) {
      setFormData((prev) => {
        return { ...prev, images: [], desc: "" };
      });
    }
  }, [clear]);

  const collectValues = useCallback((val, type) => {
    setMssg("");
    setClear(false);
    if (type === "IMG_UPLOAD") {
      setFormData((prev) => {
        return {
          ...prev,
          images: [
            ...prev.images,
            new File([val], val.name, { type: val.type })
          ]
        };
      });
      return;
    }
    setFormData((prev) => {
      return { ...prev, [type]: val };
    });
  }, []);

  return (
    <div className="h-panel">
      <div className="bg-white relative  space-x-6 h-full flex shadow-sm_dark rounded-md mt-6 p-small ">
        <NewProductForm
          collectValues={collectValues}
          clear={clear}
        ></NewProductForm>
        <div>
          <ImageUploadForm
            clear={clear}
            setMssg={setMssg}
            collectValues={collectValues}
          ></ImageUploadForm>
          <TextArea
            formData={formData}
            collectValues={collectValues}
          ></TextArea>
          {mssg && (
            <div className="absolute mt-2 text-xs text-[#FF385C] mb-2 z-50">
              {mssg}
            </div>
          )}
        </div>
        <SubmitButtons
          formData={formData}
          clearForm={clearForm}
          setMssg={setMssg}
        ></SubmitButtons>
      </div>
    </div>
  );
}

export default AddNewProduct;
