import React, {useState} from 'react';
import styles from './Accordion.module.sass';

const Accordion = (props) =>{
    const [accordion, setActiveAccordion] = useState(false);
    
    function toggleAccordion(index) {
        if(index === accordion){
            setActiveAccordion(false);
            return
        }
        setActiveAccordion(index);
    }    

return(
<>
<div className={styles.accordionContainer}>

<section className={styles.accordionMenu}>  

    {props.section.map((item, index)=>
        <article key={index} onClick={()=> toggleAccordion(index)} className={styles.menuBox}>
            <div className={styles[accordion === index ? 'accordionHeadingActive' : 'accordionHeadingInactive']}>
                <p className={styles.heading}>{item.question}</p>
                <p className={styles[accordion === index ? 'arrowDown' : 'arrowRight']}>
                    <i className="fas fa-arrow-down small"/>
                </p>
            </div>     
            
            <div className={styles[accordion === index ? 'active' : 'inactive']}>{item.answer}</div>
        </article>
    )}

</section>
</div>
</>
)

}

 

export default Accordion;