import React from 'react';
import styles from './Button.module.sass';


const Button = (props) =>{
const {isActive, text, value} = props;

return(
    <>
    <div className={styles[isActive ? 'boxActive' : 'boxInactive']}>
        <div className={styles.button}>
            <p>{value}</p>
        </div>
        <p>{text}</p>
    </div>

    </>
)

}

 
export default Button;