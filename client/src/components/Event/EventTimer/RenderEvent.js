import React, { useEffect, useState } from "react";
import styles from './EventTimer.module.sass';

//clearInterval(id);
// let progressBarWidth = timeleft / timetotal * $element.width();


const EventTimer = (props) => {
    const {removeTask, toggleTask, todo, todo:{deadline, event, complete, id}} = props;


    useEffect(() => {
        // const isComplete = newdeadline <= new Date() ? 'comleted' : 'not yet';
        const dateNow = Date.parse(new Date());
        const dedlineDate = Date.parse(deadline);
        setTimeout(() => {
            console.log(`IS END ${event}`);
            console.log(`complete ${complete}`);
            //toggleTask(id)
        },
        dedlineDate - dateNow )
      }, []);

    //   useEffect(()=>{
    //     setInterval(() => {
    //         console.dir(todo)
    //     }, 5000);
    //   })

    //   useEffect(()=>{
    //     const dedlineDate = Date.parse(deadline);
    //     setInterval(() => {
    //         const dateNow = Date.parse(new Date());
    //         const width = Math.floor(dateNow * 100 / dedlineDate);
    //         console.log(`Left ${width}%`);

    //         dedlineDate - dateNow
    //     }, 50000);
      
    //   }, [])

    return (
    
    <>
     {/* <article key={index} onClick={()=> toggleAccordion(index)} className={styles.menuBox}></article> */}
    <li 
    key={todo.id}
    className={styles.listItem} >
    
        {/* <div className={styles[complete ? 'completed' : 'notCompleted']}></div> */}

        <span 
        // onClick={()=> toggleTask(todo.id)}
        >{todo.event}</span>
        
        <span>{todo.deadline}</span>

        <span onClick={()=> removeTask(todo.id)}>
            X
        </span>

    
    </li>

    {/* <div style={{'display': iscomplete ? 'block' : 'none'}}>You did one event. Have more</div> */}


    </>
          )

  };

export default EventTimer;