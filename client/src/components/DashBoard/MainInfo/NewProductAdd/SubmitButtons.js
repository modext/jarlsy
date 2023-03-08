import { arrayUnion, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../../../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImSpinner2 } from "react-icons/im";

function SubmitButtons({ formData, setMssg, clearForm }) {
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    if (save) {
      if (formData.images.length > 0 && formData.formData && formData.desc) {
        localStorage.setItem(
          "savedProduct",
          JSON.stringify({ formData: formData.formData, desc: formData.desc })
        );
      }
      setSave(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

  async function addNewItem(link) {
    let uniqueId = uuidv4();
    await setDoc(doc(db, "users", user.uid, "products", uniqueId), {
      ...formData.formData,
      productImg: [...link],
      description: formData.desc,
      createdAt: serverTimestamp(),
      adminId: user.uid
    });
    await setDoc(doc(db, "users", user.uid, "productsAdminInfo", uniqueId), {
      revenue: 0,
      sold: 0
    });
    await setDoc(doc(db, "users", user.uid, "productReviews", uniqueId), {
      reviews: arrayUnion()
    });
  }
  async function uploadImageAddItem(file) {
    let name = file.name.split(".");
    const fileRef = ref(
      storage,
      "productImages/" + name[0] + uuidv4() + "." + name[1]
    );
    const snap = await uploadBytes(fileRef, file);
    const picUrl = await getDownloadURL(fileRef);
    return picUrl;
  }

  return (
    <div className="mt-4  absolute bottom-[17.28px] flex space-x-3 right-[17.28px] ">
      <button
        onClick={() => {
          let keys = Object.keys(formData.formData);
          let eachVal = keys.some((key) => {
            return !formData.formData[key];
          });
          if (!eachVal && formData.desc && formData.images.length > 0) {
            setLoading(true);
            let promiseArr = [];
            formData.images.forEach((file) => {
              promiseArr.push(uploadImageAddItem(file));
            });
            Promise.all(promiseArr)
              .then((res) => {
                return addNewItem(res);
              })
              .then((_) => {
                setLoading(false);
                clearForm(true);
              })
              .catch((err) => {
                console.log(err.message);
              });
            return;
          }
          if (eachVal || !formData.desc) {
            setMssg("Enter All Fields");
          } else if (formData.images.length === 0) {
            setMssg("Select at least one image");
          }
        }}
        className={`bg-[#FF385C] hover:shadow-sm_dark  transition-all duration-300 text-small ${
          loading ? "bg-[#ff385d8c]" : "bg-[#FF385C]"
        } border-[#FF385C] border-[.5px] flex items-center justify-center   font-medium text-white p-2 px-3 rounded-sm`}
      >
        {loading && (
          <ImSpinner2 className="animate-spin mr-1.5 w-4 h-4 -ml-2 "></ImSpinner2>
        )}
        <div>Add Product</div>
      </button>
      <button
        disabled={loading}
        className="border-[#FF385C] border-[.5px] hover:shadow-sm_dark  transition-all duration-300 text-small text-[#FF385C] font-medium  p-2 px-3 rounded-sm"
        onClick={() => {
          setSave(true);
        }}
      >
        Save Product
      </button>
    </div>
  );
}

export default SubmitButtons;
