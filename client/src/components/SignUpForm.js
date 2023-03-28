import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { closeModal } from "../store/modal";
import Input from "./DashBoard/MainInfo/NewProductAdd/Input";
import { ImSpinner2 } from "react-icons/im";

function SignUpForm({ asAdmin }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    storeName: "",
    address: ""
  });
  const [err, setErr] = useState({ type: "", mssg: "" });
  function changeFormData(val, type) {
    setErr({ type: "", mssg: "" });
    setFromData((prev) => {
      return { ...prev, [type]: val };
    });
  }
  async function signUp() {
    let { user } = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    await updateProfile(user, { displayName: formData.name });
    if (asAdmin) {
      await setDoc(doc(db, "users", user.uid), {
        type: "admin",
        storeName: formData.storeName,
        address: formData.address,
        visitors: []
      });
    } else {
      await setDoc(doc(db, "users", user.uid), {
        type: "user"
      });
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.password ||
      !formData.email ||
      !formData.conPassword
    ) {
      setErr({ type: "Not Entered", mssg: "Enter all the fields" });
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
      setErr({
        type: "Password Err",
        mssg: "Password must be minimum eight characters, at least one letter and one number"
      });
      return;
    }
    if (formData.password !== formData.conPassword) {
      setErr({ type: "Confirm Password", mssg: "Enter Matching Passwords" });
      return;
    }
    setLoading(true);
    signUp()
      .then(() => {
        dispatch(closeModal());
        setLoading(false);
        if (asAdmin) {
          history.push("/admin/dashboard");
        }
      })
      .catch((err) => {
        setErr({ type: "Server Error", mssg: `${err.message}` });
        setLoading(false);
      });
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        {(err.type === "Not Entered" || err.type === "Server Error") && (
          <div className="text-xs text-[#FF385C] mb-2">{err.mssg}</div>
        )}
        <div>
          <label className="font-medium text-small" htmlFor="name">
            Name
          </label>
          <Input
            value={formData.name}
            getAllValues={changeFormData}
            placeholder="Enter Name"
            id="name"
          ></Input>
        </div>
        <div className="mt-3 block">
          <label className="font-medium text-small" htmlFor="email">
            Email Address
          </label>
          <Input
            getAllValues={changeFormData}
            placeholder="Enter Email"
            type="email"
            value={formData.email}
            id="email"
          ></Input>
        </div>
        <div className="mt-3 block">
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
          {err.type === "Password Err" && (
            <div className="text-xs text-[#FF385C] mt-2">{err.mssg}</div>
          )}
        </div>
        <div className="mt-3 block">
          <label className="font-medium text-small" htmlFor="conPassword">
            Confirm Password
          </label>
          <Input
            getAllValues={changeFormData}
            placeholder="Enter Password"
            type="password"
            id="conPassword"
            value={formData.conPassword}
          ></Input>
          {err.type === "Confirm Password" && (
            <div className="text-xs text-[#FF385C] mt-2">{err.mssg}</div>
          )}
        </div>
      </div>
      {asAdmin && (
        <div>
          <div className="mt-4">
            <label className="font-medium text-small" htmlFor="address">
              Enter Address
            </label>
            <Input
              getAllValues={changeFormData}
              placeholder="Enter Address"
              type="text"
              id="address"
              value={formData.address}
            ></Input>
          </div>
          <div className="mt-4">
            <label className="font-medium text-small" htmlFor="storeName">
              Enter Store Name
            </label>
            <Input
              getAllValues={changeFormData}
              placeholder="Enter Store Name"
              type="text"
              id="storeName"
              value={formData.storeName}
            ></Input>
          </div>
        </div>
      )}
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
        <span>Sign Up</span>
      </button>
    </form>
  );
}

export default SignUpForm;
