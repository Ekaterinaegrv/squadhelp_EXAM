import React, { useEffect, useState } from "react";
import TimerEvent from "../TimerEvent/TimerEvent";
import styles from './RenderEvent.module.sass';


const RenderEvent = (props) => {
    const {removeTask, completeToState, todo, todo:{deadline, event, id, complete}} = props;

    const formatDate = () => {
        const deadlineTime = new Date(deadline)
        const deadlineTimeToLocal = deadlineTime.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit"})
        return(deadlineTimeToLocal)
    }

    return (
    
    <>
    <li 
    key={todo.id}
    className={styles[complete ? 'listItemCompete' : 'listItemNotCompete']} 
    >
        <div className={styles.eventBox}>
        <span>Your event</span>
        <span className={styles.event}>{todo.event}</span>
        </div>
        
        <div className={styles.eventBox}>
        <span>Deadline</span>
        <span className={styles.deadline}>{formatDate()}</span>
        </div>


        <span onClick={()=> removeTask(todo.id)}>
            <i className="fas fa-trash"></i>    
        </span>
    </li>
    

    <TimerEvent
        todo={todo}
        completeToState={completeToState}
    />

    </>

    )

  };

export default RenderEvent;