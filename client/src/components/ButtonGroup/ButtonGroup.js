import React, {useState} from 'react';
import styles from './ButtonGroup.module.sass';
import Header from '../Header/Header';
import Button from './Button/Button';

const contents = [
  {
    id:1,
    value: "Yes",
    text: "The Domain should exactly match the name",
  },
  {
    id:2,
    value: "Yes",
    text: "But minor variations are allowed (Recommended)",
  },
  {
    id:3,
    value: "No",
    text: "I am only looking for a name, not a Domain",
  },
];


const ButtonGroup = (props) =>{
    const [isActive, setIsActive] = useState('');

    const renderButton = contents.map((content) => (
      <div
        onClick={() => {setIsActive(content.id)}} className={styles}
        key={content.id}
        > 
        <Button
            isActive={content.id === isActive}
            text={content.text}
            value={content.value}
        /> 
        </div>
      ))

return(
    <>
    <Header/>
    <section className={styles.containerPadding}>
        {renderButton}
    </section>
    </>
)}

export default ButtonGroup;
