import React, { useEffect, useState } from "react";
import NotificationEvent from "../TimerEvent/NotificationEvent";
import TimerEvent from "../TimerEvent/TimerEvent";
import styles from './RenderEvent.module.sass';
import moment from 'moment';


const RenderEvent = (props) => {
    const {removeTask, completeToState, todo} = props;
    const [nowLeft, setNowLeft] = useState();


    const formatDate = () => {
        const deadlineTime = new Date(todo.deadline)
        const deadlineTimeToLocal = deadlineTime.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit"})
        return(deadlineTimeToLocal)
    }

    const durationUntilFinish = (left) => {
            setNowLeft(left)
    }

    return (
    
    <>
    <li 
    key={todo.id}
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
        <div>{nowLeft === undefined ? 'refresh page' : nowLeft}</div>
        </div>

        <span onClick={()=> removeTask(todo.id)}>
            <i className="fas fa-trash"></i>    
        </span>
    
    </li>
    


    <TimerEvent
        todo={todo}
        completeToState={completeToState}
        durationUntilFinish={durationUntilFinish}

    />
    {/* <NotificationEvent
        todo={todo}

        /> */}

    </>

    )

  };

export default RenderEvent;