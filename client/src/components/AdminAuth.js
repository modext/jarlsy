import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SignUpForm from "./SignUpForm";

function AdminAuth() {
  const [user, loading] = useAuth();
  return (
    loading &&
    (!user ? (
      <>
        <div className=" h-screen   mx-auto  max-w-[800px]">
          <div className="relative top-1/2 -translate-y-1/2 border-[1px] p-4 rounded-sm">
            <div className="font-semibold text-lg mb-4">Sign Up as Admin</div>
            <div className="">
              <SignUpForm asAdmin={true}></SignUpForm>
            </div>
          </div>
        </div>
      </>
    ) : user.type === "admin" ? (
      <Redirect to={"/admin/dashboard"} />
    ) : (
      <Redirect to={"/"} />
    ))
  );
}

export default AdminAuth;
