import React from 'react';
import FAQ from '../../constants/FAQConstants';
import CONSTANTS from '../../constants/constants';
import styles from './HowItWorks.module.sass';
import Accordion from '../../components/Accordion/Accordion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FeaturesCards from '../../components/FeaturesCards/FeaturesCards';
import { Link } from 'react-router-dom';


const HowItWorks = (props) => {

return(
<>
<Header/>
<section className={styles.container}>
    <article className={styles.main}>
        <span className={styles.subtitleButton}>World's #1 Naming Platform</span>
        <h1>How Does Squadhelp Work?</h1>
        <p className={styles.content}>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
        <div className={styles.button}>
            <small className="fas fa-play mr-2"></small>
            <span>Play Video</span>
        </div>
    </article>
    
    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/container.png`} className={styles.mainImage} alt='How Does Squadhelp Work?'/>
</section>

<section className={styles.containerPadding}>
        <article  className={styles.heading}>
            <span className={styles.subtitleButton}>Ous services</span>
            <h2>3 Ways To Use Squadhelp</h2>
            <p className={styles.content}>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
        </article>

    <section className={styles.cardsWrapper}>

        <FeaturesCards
            imageSrc = 'how_it_works/cards/1.png'
            imageAlt = 'cards-image'
            cardHeading = 'Launch a Contest'
            description = 'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.'
        />
        <FeaturesCards
            imageSrc = 'how_it_works/cards/2.png'
            imageAlt = 'cards-image'
            cardHeading = 'Explore Names For Sale'
            description = 'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design'
        />
        <FeaturesCards
            imageSrc = 'how_it_works/cards/3.png'
            imageAlt = 'cards-image'
            cardHeading = 'Agency-level Managed Contests'
            description = 'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs'
        />
      
    </section>
</section>
<section className={styles.containerPadding}>
    <article  className={styles.heading}>
        <img className={styles.icon} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/champion-cup.png`} alt='champion cup'/>
        <h2>How Do Naming Contests Work?</h2>
    </article>
    
    <section className={styles.howNamingBox}> 
        <img className={styles.mainImage} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/howDoNaming.png`} alt='How Do Naming Contests Work?'/>
        
            <ul className={styles.list}>
                <li className={styles.listItem}>
                        <span>1.</span>
                        <p>Fill out your Naming Brief and begin receiving name ideas in minutes</p>
                </li>
                <li className={styles.listItem}>
                    <span>2.</span>
                    <p>Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.</p>
                </li>
                <li className={styles.listItem}>
                    <span>3.</span>
                    <p>Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.</p>
                </li>
                <li className={styles.listItem}>
                    <span>4.</span>
                    <p>Pick a Winner. The winner gets paid for their submission.</p>
                </li>
            </ul>
    </section>

</section>


<section className={styles.containerPadding}>

    <section className={styles.grid}>

        <nav className={styles.navigate}>
            <ul className={styles.navigateBox}>
                <li><a href="#launching">Launching A Contes</a></li>
                <li><a href="#buying">Buying From Marketplace</a></li>
                <li><a href="#managed">Managed Contests</a></li>
            </ul>
        </nav>
        
        <main className={styles.faq}>
            <div className={styles.faqBox} id='launching'>
                <h3>Launching A Contest</h3>
                <Accordion section={FAQ.LAUNCHING_A_CONTEST}/>
            </div>
            <div className={styles.faqBox} id='buying'>
                <h3>Buying From Marketplace</h3>
                <Accordion section={FAQ.BUYING_FROM_MARKETPLACE}/>
            </div>
            <div className={styles.faqBox} id='managed'>
                <h3 id='Managed'>Managed Contests</h3>
                <Accordion section={FAQ.BUYING_FROM_MARKETPLACE}/>
            </div>                
                
        </main>
    </section>
</section>

<section className={styles.blueCallToAction}>
    
    <h2>Ready to get started?</h2>
    <p className={styles.content}>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
    <div className={styles.button}> <span>Play Video</span> </div>
    
    <img className={styles.leafImgRight} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/right-leaf.png`} alt='leaf'/>
    <img className={styles.leafImgLeft} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/left-leaf.png`} alt='leaf'/>
</section>
    
<section className={styles.containerPadding}>
<div className={styles.containerDignity}>

    

    <div className={styles.boxDignity}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/stars.svg`}  alt='stars'/>
        <p className={styles.content}>4.9 out of 5 stars from 25,000+ customers.</p>
    </div>
    <div className={styles.boxDignity}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/people.png`} alt='people'/>
        <p className={styles.content}>Our branding community stands 200,000+ strong.</p>
    </div>
    <div className={styles.boxDignity}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/sharing-files.svg`} alt='sharing-files'/>
        <p className={styles.content}> 140+ Industries supported across more than 85 countries – and counting.</p>
    </div>
    
</div>    

</section>

<section className={styles.containerPadding}>


    <section className={styles.contactsBlock}>

    <div className={styles.leftSection}>
        <article className={styles.questionText}>
            <span><i className="fas fa-angle-right btn-icon__inner"/></span>
            <div>
                <h4>Pay a Fraction of cost vs hiring an agency</h4>
                <p className={styles.content}>For as low as $199, our naming contests and marketplace allow you to get an amazing brand quickly and affordably.</p>
            </div>
        </article>

        <article className={styles.questionText}>
            <span><i className="fas fa-angle-right btn-icon__inner"/></span>
            <div>
                <h4>Satisfaction Guarantee</h4>
                <p className={styles.content}>Of course! We have policies in place to ensure that you are satisfied with your experience. <a href='/'>Learn more</a></p>
            </div>
        </article>
    </div>

    <div className={styles.rightSection}>
        <h2 className={styles.headerContacts}>Questions?</h2>
        <p className={styles.content}>Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
        <button href='#'>Schedule Consultation</button>
        <a href='tel:8773553585'>
            <img src='https://www.squadhelp.com/resources/assets/imgs/front/phone_icon.svg' className={styles.phoneimg} alt='phone'/>
            (877)355-3585</a>
        <a href='tel:8773553585'><p className={styles.content}>Call us for assistance</p></a> 
    </div>
    </section>

</section>

<section className={styles.containerPadding}>
    <section className={styles.brands}>
        <h2 className={styles.headingBrands}>Featured In</h2>
        <div className={styles.brandsItems}>
            <Link to="#"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/brands/forbes.svg`} alt='forbes'/></Link>
            <Link to="#"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/brands/TNW.svg `} alt='TNW'/></Link>
            <Link to="#"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/brands/chicago.svg `} alt='chicago'/></Link>
            <Link to="#"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/brands/Mashable.svg`} alt='Mashable'/></Link>
        </div>
    

    </section>
</section>
 <Footer/>
 </>
)
};

export default HowItWorks