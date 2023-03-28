import React from "react";
import Form from "../components/Form";
import FormReset from "../components/FormReset";

function ResetPassword() {
  return (
    <div className="w-2/5	  border-[.5px] p-3 rounded-sm border-gray-300 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <FormReset></FormReset>
    </div>
  );
}

export default ResetPassword;
