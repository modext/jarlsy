import React, { useEffect, useState } from "react";
import Form from "./Form";
import { IoMdClose } from "react-icons/io";
import { closeModal } from "../store/modal";
import { useDispatch } from "react-redux";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";

function Modal({ asAdmin }) {
  const dispatch = useDispatch();
  const [signUpForm, switchToSignUp] = useState(false);
  const triggerModal = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    asAdmin && switchToSignUp(true);
  }, [asAdmin]);

  return (
    <div
      className={`fixed animplane opacity-20 w-1/2 overflow-hidden rounded-md bg-white z-50 top-1/2  left-1/2 -translate-y-1/2 flex -translate-x-1/2 ${
        asAdmin ? "h-max" : "h-3/5"
      }`}
    >
      <div
        className="absolute z-50 top-2 cursor-pointer right-3"
        onClick={() => {
          triggerModal();
        }}
      >
        <IoMdClose className="w-5 h-5"></IoMdClose>
      </div>
      {asAdmin ? (
        ""
      ) : (
        <div className="w-1/2 relative">
          <h3 className="absolute z-50  text-white p-3 bg-[#FF385C]  rounded-br-md text-3xl font-semibold">
            {!signUpForm ? "Login" : "SignUp"}
          </h3>
          <div className="absolute w-full h-full bg-[#0000001c]"></div>

          <img
            src="/img/login.webp"
            className="w-full  h-full object-cover"
            alt=""
          />
        </div>
      )}

      <div className="flex-1 relative p-4">
        {!signUpForm ? (
          <>
            <Form></Form>
            <div className="text-center mt-4">
              <div className="flex space-x-4 items-center">
                <div className="h-[1px] w-full  bg-gray-300"></div>
                <div className="text-small text-gray-700 text-xs my-1">OR</div>
                <div className="h-[1px] w-full bg-gray-300"></div>
              </div>
              <button className="border-2 hover:border-black transition-all duration-300  w-full font-bold flex justify-center items-center space-x-2 rounded-md text-small mt-2 p-2">
                <img
                  className="w-6 h-5 object-cover"
                  src="/img/glogo.png"
                  alt=""
                />
                <div>Login with Google</div>
              </button>
            </div>
            <Link
              to="/reset-password"
              className="text-[10px] block text-[#FF385C] cursor-pointer mt-2  text-center"
            >
              Forgot Password?
            </Link>
          </>
        ) : (
          <div>
            <SignUpForm asAdmin={asAdmin}></SignUpForm>
          </div>
        )}
        {asAdmin ? (
          ""
        ) : (
          <div className="text-xs text-gray-700 absolute bottom-4 left-1/2 -translate-x-1/2">
            {!signUpForm ? "New to Brance? " : "Already a customer? "}
            <button
              onClick={() => {
                switchToSignUp(() => {
                  return !signUpForm;
                });
              }}
              className="text-[#FF385C] hover:text-[#ff0835]"
            >
              {!signUpForm ? "Sign up" : "Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
