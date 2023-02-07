import React, { useState } from "react";
import {Formik, Form, Field} from 'formik';

const EventForm = (props) => {
 
  const [userInput, setUserInput] = useState('');

  const initialValues = {
    todoText: '',
    deadlineDate: '',
    deadlineTime: new Date()
  }

  const changeHandler = ({target:{value}}) => {
    setUserInput(value);
    
  }

  
  const submitHandler = (event) => {
    //event.preventDefault()
    const {todoText, deadlineDate, deadlineTime} = event;

    props.addTask(userInput);
    setUserInput('')

    }

  


  return (

    <>
    <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}>
        {(props) => (
                <Form>
                  <Field 
                    type='text' 
                    name="todoText" 
                    placeholder="Type your event title" 
                    value={userInput}
                    onChange={changeHandler}
                    />

                    <Field 
                    name="deadlineDate" 
                    type="date"
                    
                    />
                    <Field 
                    name="deadlineTime" 
                    type="time"
                    />

                    <button type="submit">CREATE EVENT</button>

        
                </Form>
            )}
    </Formik>
    </>
          )

  };

export default EventForm