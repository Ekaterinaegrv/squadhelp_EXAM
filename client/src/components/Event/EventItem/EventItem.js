import React, { useState } from "react";
import TimerEvent from "../TimerEvent/TimerEvent";
import styles from './EventItem.module.sass';
import NotificationEvent from "../TimerEvent/NotificationEvent";


const EventItem = (props) => {
    const {removeTask, completeToState, todo} = props;
    const [nowLeft, setNowLeft] = useState();


    const formatDate = () => {
        const deadlineTime = new Date(todo.deadline)
        const deadlineTimeToLocal = deadlineTime.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit"})
        return(deadlineTimeToLocal)
    }

    const durationUntilFinish = (left) => {
        setNowLeft(left);
    }
 
    return (
    <>
    <div 
    className={styles[todo.complete ? 'listItemCompete' : 'listItemNotCompete']} 
    >
        <div className={styles.eventBox}>
        <span>Your event</span>
        <span className={styles.event}>{todo.event}</span>
        </div>
        
        <div className={styles.eventBox}>
        <span>Deadline</span>
        <span className={styles.deadline}>{formatDate()}</span>
        </div>

        <div className={styles.eventBox}>
        <span>When deadline</span>
        <div>{nowLeft ? nowLeft : 'No data'}</div>
        </div>

        <span onClick={()=> removeTask(todo.id)}>
            <i className="fas fa-trash"></i>    
        </span>  
    </div>

    <TimerEvent
        todo={todo}
        completeToState={completeToState}
        durationUntilFinish={durationUntilFinish}
    />
    <NotificationEvent
        todo={todo}
    />
    </>
    )
  };

export default EventItem;