import React from "react";

const NotificationEvent = (props) => {

  const {event, notification} = props.todo;

  if (notification) {
    const notificationTime = new Date(notification);
    if (notificationTime.getTime() < Date.now()) {
      console.log("Notification time has already passed.");
    } else {
      const delay = notificationTime.getTime() - Date.now();
      setTimeout(() => {
        if ("Notification" in window) {
          Notification.requestPermission().then((permission)=>{
            if (permission === "granted") {
              alert(`Your event '${event}' will finish soon`)
            }
          });
        } else {
          console.log("Notifications not supported by this browser.");
        }
      }, delay);
    }
  }

    return (
        <>
        </>
          )

  };

export default NotificationEvent
