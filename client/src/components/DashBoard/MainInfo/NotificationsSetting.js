import React from "react";
import Notification from "./Notification";

function NotificationsSetting() {
  return (
    <div className="pl-small">
      <Notification
        title="Message"
        message="You will be notified regarding any message"
      ></Notification>
      <Notification
        title="Order Status Changed"
        message="You will be notified when customer make changes to the order"
      ></Notification>
      <Notification
        title="Reviews"
        message="You will be notified when customer leaves any reviews"
      ></Notification>
      <Notification
        title="New Purchase"
        message="You will be notified when customer purchases any product"
      ></Notification>
    </div>
  );
}

export default NotificationsSetting;
