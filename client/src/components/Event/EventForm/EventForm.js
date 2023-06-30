import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import styles from './EventForm.module.sass';
import Schems from '../../../validators/validationSchems';


const initialValues = {
  todoText: '',
  deadline: '', 
  notification: ''
}
const EventForm = (props) => {

  const submitHandler = (values, { resetForm }) => {
    props.addTask(values);
    resetForm();
  };

  return (

    <>
    <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={Schems.EventSchema}
        >
        {(props) => (
                <Form
                className={styles.main}
                >
                <label>Event title</label>
                  <Field 
                    type='text' 
                    name="todoText" 
                    id="todoText" 
                    placeholder="Type your event title" 
                    required
                    />
                    <ErrorMessage name="todoText" component="div" className={styles.error}/>
                <label>Deadline time</label>
                  <Field 
                    name="deadline"
                    id="deadline"
                    type="datetime-local"
                    required
                    />
                    <ErrorMessage name="deadline" component="div" className={styles.error}/>
                <label>Notification time</label>
                  <Field 
                    name="notification"
                    id="notification"
                    type="datetime-local"
                    />
                    <ErrorMessage name="notification" component="div" className={styles.error}/>
                    <button type="submit">CREATE EVENT</button>
                </Form>
            )}
    </Formik>
    </>
          )
  };

export default EventForm