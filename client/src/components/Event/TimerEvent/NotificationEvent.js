import React from "react";

const NotificationEvent = (props) => {
  const {event, notification, complete} = props.todo;

  if (notification && !complete) {
    const notificationTime = new Date(notification);
    if (notificationTime.getTime() < Date.now()) {
      return null
    } else {
      const delay = notificationTime.getTime() - Date.now();
      setTimeout(() => {
        if ("Notification" in window) {
          Notification.requestPermission().then((permission)=>{
            if (permission === "granted") {
              const alertText = event ? `Your event '${event}' will finish soon` : 'Your event will finish soon'
              alert(`${alertText}`);              
            }
          })
          .catch((error) => {
            console.error(error);
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
