import React, { useEffect, useState } from "react";
import moment from 'moment';

export const useTimer = (todo) => {
    const {deadline} = todo;
    const [durationUntilFinish, setDurationUntilFinish] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    let time;
    const intervalHandler = () => {
        time = moment(deadline).endOf().fromNow().toString(); 
        setDurationUntilFinish(time);
    }


    useEffect(() => {  
        const dateNow = Date.parse(new Date());                    
        intervalHandler();
        const idInterval = setInterval(() => intervalHandler(), 1000);      

        const idTimer = setTimeout(() => {
            setIsComplete(true);
            clearInterval(idInterval)    
        },
        deadline - dateNow )

        return () => {
            clearTimeout(idTimer);
        }
    },[]);

    
    return {isComplete, durationUntilFinish}
  

  };