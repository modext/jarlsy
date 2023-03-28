import React, { useState } from "react";
import Input from "./DashBoard/MainInfo/NewProductAdd/Input";
import { ImSpinner2 } from "react-icons/im";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modal";

function FormReset() {
  const [email, setEmail] = useState({ email: "" });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  function changeFormData(val, type) {
    setErr({ type: "", mssg: "" });
    setEmail({ [type]: val });
  }
  const [err, setErr] = useState({ type: "", mssg: "" });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setErr({ type: "", mssg: "" });
          if (!email.email) {
            setErr({ type: "Not Entered", mssg: "Enter Email" });
            return;
          }
          setLoading(true);
          sendPasswordResetEmail(auth, email.email)
            .then(() => {
              setLoading(false);
              history.replace("/");
            })
            .catch((err) => {
              setErr({ type: "Server Error", mssg: `${err.message}` });
              setLoading(false);
            });
        }}
      >
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
            value={email.email}
            type="email"
            id="email"
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
          <span>Reset Password</span>
        </button>
      </form>
      <div
        onClick={() => {
          history.replace("/");
        }}
        className="text-xs block text-[#FF385C] cursor-pointer mt-2  text-center"
      >
        Login
      </div>
    </>
  );
}

export default FormReset;
