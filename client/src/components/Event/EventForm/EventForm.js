import React, { useReducer } from "react";
import {Formik, Form, Field} from 'formik';
import styles from './EventForm.module.sass'

const reducer = (state, action) => {
  const { name, value } = action;
  return {
    ...state,
    [name]: value,
  };
};


const EventForm = (props) => {


  const [eventInput, dispatch] = useReducer(reducer, {
    todoText: '',
    deadline: '',
    notification: ''
  });

  const changeHandler = ({ target: { name, value } }) => {
    const action = { name, value };
    dispatch(action);
    console.log(value)
  };

  const initialValues = {
    todoText: '',
    deadline: '', 
    notification: ''
  }
  
  const submitHandler = (event) => {
    props.addTask(eventInput);
    console.log(eventInput)

    }



  return (

    <>
    <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}>
        {(props) => (
                <Form
                className={styles.main}
                >
                  <Field 
                    type='text' 
                    name="todoText" 
                    placeholder="Type your event title" 
                    value={eventInput.todoText}
                    onChange={changeHandler}
                    />

                    <Field 
                    name="deadline" 
                    type="datetime-local"
                    onChange={changeHandler}
                    value={eventInput.deadline}
                    />

                    <select 
                        name="notification" 
                        onChange={changeHandler}
                        value={eventInput.notification}>
                          
                      <option disabled="disabled">When to remind about the event</option>
                      <option value='120'>2 minute</option>
                      <option value='3600'>1 hour</option>
                      <option value='21600'>6 hours</option>
                      <option value='43200'>12 hours</option>
                      <option value='86400'>24 hours</option>
                    </select> 
                    
                  

                    <button type="submit">CREATE EVENT</button>

        
                </Form>
            )}
    </Formik>
    </>
          )

  };

export default EventForm