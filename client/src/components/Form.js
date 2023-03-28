import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { closeModal } from "../store/modal";
import { ImSpinner2 } from "react-icons/im";
import Input from "./DashBoard/MainInfo/NewProductAdd/Input";
import { doc, getDoc } from "firebase/firestore";

function Form() {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [err, setErr] = useState({ type: "", mssg: "" });
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const changeFormData = (val, type) => {
    setErr({ type: "", mssg: "" });
    setformData((prev) => {
      return { ...prev, [type]: val };
    });
  };
  async function logIn() {
    let { user } = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const reference = doc(db, "users", user.uid);
    const snapshot = await getDoc(reference);
    return snapshot;
  }
  function submitHandler(e) {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      setErr({ type: "Not Entered", mssg: "Enter all the fields" });
      return;
    }
    setLoading(true);
    logIn()
      .then((snap) => {
        if (snap.exists()) {
          const { type } = snap.data();
          if (type === "admin") {
            history.push("/admin/dashboard");
          }
        }
        dispatch(closeModal());
        setLoading(false);
      })
      .catch((err) => {
        setErr({ type: "Server Error", mssg: `${err.message}` });
        setLoading(false);
      });
  }
  return (
    <form onSubmit={submitHandler}>
      {(err.type === "Not Entered" || err.type === "Server Error") && (
        <div className="text-xs text-[#FF385C] mb-2">{err.mssg}</div>
      )}
      <div>
        <label className="font-medium text-small" htmlFor="email">
          Email Address
        </label>
        <Input
          getAllValues={changeFormData}
          placeholder="Enter Email"
          value={formData.email}
          type="email"
          id="email"
        ></Input>
      </div>

      <div className="mt-3">
        <label className="font-medium text-small" htmlFor="password">
          Password
        </label>
        <Input
          getAllValues={changeFormData}
          placeholder="Enter Password"
          type="password"
          value={formData.password}
          id="password"
        ></Input>
      </div>

      <button
        disabled={loading}
        className={`mt-4 ${
          loading ? "bg-[#ff385de0]" : "bg-[#FF385C]"
        }  hover:shadow-sm_dark transition-all duration-300  hover:border-[#ffc1cc] relative border-[#ff385d00] border-2 w-full font-bold rounded-md text-white text-small  p-2 flex items-center justify-center  space-x-2.5`}
        type="submit"
      >
        {loading && (
          <ImSpinner2 className="animate-spin w-4 h-4 -ml-2 "></ImSpinner2>
        )}
        <span>Log In</span>
      </button>
    </form>
  );
}

export default Form;
