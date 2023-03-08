import React, { useState } from "react";
import EditForm from "../../components/DashBoard/MainInfo/EditForm";
import NotificationsSetting from "../../components/DashBoard/MainInfo/NotificationsSetting";

function Settings() {
  const [selected, setSelected] = useState("General");
  return (
    <div className="h-panel">
      <div className="bg-white h-full flex shadow-sm_dark rounded-md mt-6 p-small">
        <div className="font-medium  pr-3 w-1/5 text-[#4e4e4e] border-r-[0.5px]">
          {["General", "Notifications"].map((selector, idx) => {
            return (
              <div
                onClick={() => {
                  setSelected(selector);
                }}
                key={idx}
                className={`p-2.5  ${
                  selector === selected ? "text-[#FF385C] bg-[#ff385d23]" : ""
                } transition-all duration-200 rounded-sm hover:bg-[#ff385d23] hover:text-[#FF385C] cursor-pointer`}
              >
                {selector}
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          {selected === "General" ? (
            <EditForm></EditForm>
          ) : (
            <NotificationsSetting></NotificationsSetting>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
