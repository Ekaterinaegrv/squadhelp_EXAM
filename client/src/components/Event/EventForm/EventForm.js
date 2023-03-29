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
  };

  const initialValues = {
    todoText: '',
    deadline: '', 
    notification: ''
  }
  
  const submitHandler = (event) => {
    props.addTask(eventInput);
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
                <label>Event title</label>
                  <Field 
                    type='text' 
                    name="todoText" 
                    placeholder="Type your event title" 
                    value={eventInput.todoText}
                    onChange={changeHandler}
                    required
                    />
                <label>Deadline time</label>
                  <Field 
                    name="deadline" 
                    type="datetime-local"
                    onChange={changeHandler}
                    value={eventInput.deadline}
                    required
                    />
                <label>Notification time</label>
                  <Field 
                    name="notification" 
                    type="datetime-local"
                    onChange={changeHandler}
                    value={eventInput.notification}
                    />
                
                    <button type="submit">CREATE EVENT</button>

                </Form>
            )}
    </Formik>
    </>
          )
  };

export default EventForm