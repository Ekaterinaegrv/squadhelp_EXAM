import React from 'react';
import styles from './FeaturesCards.module.sass';
import CONSTANTS from '../../constants/constants';

const FeaturesCards = (props) =>{

return(

    <div className={styles.featuresCard}>
        <article>
        <img className={styles.cardsIcon} src={`${CONSTANTS.STATIC_IMAGES_PATH}${props.imageSrc}`} alt={props.imageAlt}/>            
        <h4>{props.cardHeading}</h4>
        <p className={styles.content}>{props.description}</p>
        <button className={styles.buttonSquareAngle}>{props.cardHeading}</button>
        </article>
    </div>

)

}

 
export default FeaturesCards;