import React, { useEffect, useState } from "react";
import TimerEvent from "../TimerEvent/TimerEvent";
import styles from './RenderEvent.module.sass';

//clearInterval(id);
// let progressBarWidth = timeleft / timetotal * $element.width();


const RenderEvent = (props) => {
    const {removeTask, todo, todo:{deadline, event, id}} = props;


    // useEffect(() => {
    //     // const isComplete = newdeadline <= new Date() ? 'comleted' : 'not yet';
    //     const dateNow = Date.parse(new Date());
    //     const dedlineDate = Date.parse(deadline);
    //     setTimeout(() => {
    //         console.log(`IS END ${event}`);
    //         console.log(`complete ${complete}`);
    //         //toggleTask(id)
    //     },
    //     dedlineDate - dateNow )
    //   }, []);



    return (
    
    <>
    <li 
    key={todo.id}
    className={styles.listItem} >
    

        <span 
        >{todo.event}</span>
        
        <span>{todo.deadline}</span>

        <span onClick={()=> removeTask(todo.id)}>
            X
        </span>
    </li>

    <TimerEvent
        todo={todo}
      
    />

    </>

    )

  };

export default RenderEvent;

/**

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
 */