import React from "react";
import { useSelector } from "react-redux";
import EditInputField from "./EditInputField";
import EditPhoto from "./EditPhoto";

function EditForm() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex pl-small flex-col h-full justify-between">
      <div className="flex py-4 items-start ">
        <div className="flex-1 grid grid-cols-2 mr-8 gap-x-8 gap-y-8">
          <EditInputField
            label="First Name"
            value={user.displayName.split(" ")[0]}
          ></EditInputField>
          <EditInputField
            label="Last Name"
            value={user.displayName.split(" ")[1]}
          ></EditInputField>
          <EditInputField label="Email" value={user.email}></EditInputField>
          <EditInputField label="Phone" value="+91678996654"></EditInputField>
          <EditInputField
            label="Store Name"
            value={user.storeName}
          ></EditInputField>
          <EditInputField
            label="Location"
            value="United States"
          ></EditInputField>{" "}
          <EditInputField label="Currency" value="US Dollar"></EditInputField>
          <EditInputField label="Password" value="*******"></EditInputField>
        </div>
        <EditPhoto></EditPhoto>
      </div>
      <div className="">
        <button className="bg-[#FF385C] hover:shadow-sm_dark  transition-all duration-300 text-small font-medium text-white p-2 px-3 rounded-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditForm;
