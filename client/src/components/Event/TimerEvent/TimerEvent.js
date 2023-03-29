import React, { useEffect, useState } from "react";
import moment from 'moment';

const TimerEvent = (props) => {
    const {todo, todo:{id}, completeToState} = props;
    const [deadlineState, setDeadline] = useState({
                                date: todo.deadline,
                                isComplete: false
                                });


    const dedlineDate = deadlineState.date;

    const intervalHandler = () => {
        const time = moment(dedlineDate).endOf().fromNow(); 
        props.durationUntilFinish(time.toString());
    }
  
    useEffect(() => {                                           
        const dateNow = Date.parse(new Date());
        const dedlineDate = deadlineState.date;
        intervalHandler();
        const idInterval = setInterval(() => intervalHandler, 2000);      
        
        const idTimer = setTimeout(() => {
            setDeadline(deadlineState, deadlineState.isComplete = true);
            completeToState(id, deadlineState.isComplete);
            console.log('finish')
            clearInterval(idInterval)    
        },
        dedlineDate - dateNow )

        return () => {
            clearTimeout(idTimer);
        }
    }, []);

    return (
        <>
        </>
          )

  };

export default TimerEvent