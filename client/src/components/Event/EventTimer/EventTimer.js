import React, { useEffect, useState } from "react";
import {Formik, Form, Field} from 'formik';
import styles from "./EventTimer.module.sass";
import CreateItem from "./CreateItem";

const EventTimer = (props) => {
    const {removeTask, toggleTask, todo} = props;

   
    // useEffect(() => {
    //     return todo.complete ? 'redCard' : null //или переходит в выполненные

    //   });

    return (
    
    <>
    <div key={todo.id}>

        <div> 
            {todo.task}
        </div>

        <div onClick={()=> removeTask(todo.id)}>
            X
        </div>

    </div>

    </>
          )

  };

export default EventTimer;