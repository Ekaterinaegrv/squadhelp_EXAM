import React, { useEffect } from "react";
import styles from './EventItem.module.sass';
import {useTimer} from "../../../hooks/useTimer";

const EventItem = (props) => {
    const {removeTask, completeToState, todo} = props;
    const {isComplete, durationUntilFinish} = useTimer(todo);

    const formatDate = () => {
        const deadlineTime = new Date(todo.deadline)
        const deadlineTimeToLocal = deadlineTime.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit"})
        return(deadlineTimeToLocal)
    }
    useEffect(() => {
        if(isComplete) {
            completeToState(todo.id, isComplete);
        }
    }, [isComplete])
    
    
 
    return (
    <>
    <div 
    className={styles[isComplete ? 'listItemCompete' : 'listItemNotCompete']} 
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
        <div>{durationUntilFinish ? durationUntilFinish : 'No data'}</div>
        </div>

        <span onClick={()=> removeTask(todo.id)}>
            <i className="fas fa-trash"></i>    
        </span> 
    </div>
    </>
    )
  };

export default EventItem;