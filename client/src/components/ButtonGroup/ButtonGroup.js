import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import styles from './ButtonGroup.module.sass';
import Header from '../Header/Header';


const ButtonGroup = (props) =>{
    const [state, setState] = useState('');
    
    const submitHandler = (event) => {
        console.log(state)
    } 

    const clickHandler = ({target:{name}}) => {
        setState(name)
    }


return(
    <>
    <Header/>

    <section className={styles.containerPadding}>

    <Formik
        onSubmit={submitHandler}>
        {(props) => (
            <Form
                className={styles.main}>

                <label className={styles[state === 'domain_match_name' ? 'boxActive' : 'boxInactive']}
                htmlFor='button1'
                >
                    <Field onClick={clickHandler} className={styles.button} type="submit" value='YES' id='button1' name='domain_match_name'></Field>
                    <p>The Domain should exactly match the name</p>
                </label>

                <label className={styles[state === 'minor_variations_allowed' ? 'boxActive' : 'boxInactive']} htmlFor='button2'>
                    <Field onClick={clickHandler} className={styles.button} type="submit" value='YES' id='button2' name='minor_variations_allowed'></Field>
                    <p>But minor variations are allowed (Recommended)</p>
                </label>
                
                <label className={styles[state === 'looking_name_not_domain' ? 'boxActive' : 'boxInactive']} htmlFor='button3'>
                    <Field onClick={clickHandler} className={styles.button} type="submit" value='NO' id='button3' name='looking_name_not_domain'></Field>
                    <p>I am only looking for a name, not a Domain</p>
                </label>
                
        
            </Form>
            )}
    </Formik>
    </section>
    </>
)

}

 
export default ButtonGroup;
