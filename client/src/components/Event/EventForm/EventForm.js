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
    deadline: ''
  });

  const changeHandler = ({ target: { name, value } }) => {
    const action = { name, value };
    dispatch(action);
  };



  const initialValues = {
    todoText: '',
    deadline: ''
  }
  
  const submitHandler = (event) => {
    //event.preventDefault()    
    props.addTask(eventInput);
    //setEventInput('');
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
                    // min={new Date()} max={new Date().getTime()}

                    />

                    <button type="submit">CREATE EVENT</button>

        
                </Form>
            )}
    </Formik>
    </>
          )

  };

export default EventForm