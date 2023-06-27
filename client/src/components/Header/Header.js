import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants/constants';
import { clearUserStore, headerRequest } from '../../actions/actionCreator';

const Header = (props) => {

  useEffect(() => {
    if (!props.data) {
      props.getUser();
    }
  },[]);

    const logOut = () => {
      localStorage.clear();
      props.clearUserStore();
      props.history.replace('/login');
    };

    const startContests = () => {
      props.history.push('/startContest');
    };

    const renderLoginButtons = () => {
      if (props.data) {
        return (
          <>
            <div className={styles.userInfo}>
                  <img
                    src={props.data.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${props.data.avatar}`}
                    alt="user"
                  />
                  <span>{`Hi, ${props.data.displayName}`}</span>
                  <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
              <ul>
                <li>
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>View Dashboard</span>
                  </Link>
                </li>
                <li><Link to="/account" style={{ textDecoration: 'none' }}><span>My Account</span></Link></li>
                <li>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Messages</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" style={{ textDecoration: 'none' }}><span>Affiliate Dashboard</span></Link>
                </li>
                <li>
                  <Link to="/events" style={{ textDecoration: 'none' }}><span>My events</span></Link>
                </li>
                <li><span onClick={logOut}>Logout</span></li>
              </ul>
            </div>
            <Link
                  to="/"
                  style={{ textDecoration: 'none' }}
                  >
                     <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} className={styles.emailIcon} alt="email" />
                  </Link>
           
          </>
        );
      }
      return (
        <>
          <Link to="/login" style={{ textDecoration: 'none' }}><span className={styles.btn}>LOGIN</span></Link>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <span
              className={styles.btn}
            >
              SIGN UP
            </span>
          </Link>
        </>
      );
    };
    if (props.isFetching) {
      return null;
    }
      return (
        <div className={styles.headerContainer}>
          <div className={styles.fixedHeader}>
            <span className={styles.info}>Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.</span>
            <a href="/">Read Announcement</a>
          </div>
          <div className={styles.loginSignnUpHeaders}>
            <div className={styles.numberContainer}>
            <a href='tel:+8773553585'>
              <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
              <span>(877)&nbsp;355-3585</span> </a>
            </div>
            <div className={styles.userButtonsContainer}>
              {renderLoginButtons()}
            </div>
          </div>
          <div className={styles.navContainer}>
            <Link to="/"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} className={styles.logo} alt="blue_logo" /></Link>
            <div className={styles.leftNav}>
              <div className={styles.nav}>
                <ul>
                  <li>
                    <span>NAME IDEAS</span>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                    />
                    <ul>
                      <li><a href="/button-component">BUTTON COMPONENT</a></li>
                      <li><a href="/">BEAUTY</a></li>
                      <li><a href="/">CONSULTING</a></li>
                      <li><a href="/">E-COMMERCE</a></li>
                      <li><a href="/">FASHION & CLOTHING</a></li>
                      <li><a href="/">FINANCE</a></li>
                      <li><a href="/">REAL ESTATEe</a></li>
                      <li><a href="/">TECH</a></li>
                      <li className={styles.last}>
                        <a href="/">MORE CATEGORIES</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>CONTESTS</span>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                    />
                    <ul>
                      <li><a href="/how-it-works">HOW IT WORKS</a></li>
                      <li><a href="/">PRICING</a></li>
                      <li><a href="/">AGENCY SERVICE</a></li>
                      <li><a href="/">ACTIVE CONTESTS</a></li>
                      <li><a href="/">WINNERS</a></li>
                      <li><a href="/">LEADERBOARD</a></li>
                      <li className={styles.last}>
                        <a href="/">
                            BECOME A
                            CREATIVE
</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>OUR WORK</span>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                    />
                    <ul>
                      <li><a href="/">NAMES</a></li>
                      <li><a href="/">TAGLINES</a></li>
                      <li><a href="/">LOGOS</a></li>
                      <li className={styles.last}>
                        <a href="/">TESTIMONIALS</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>NAMES FOR SALE</span>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                    <ul>
                      <li><a href="/">POPULAR NAMES</a></li>
                      <li><a href="/">SHORT NAMES</a></li>
                      <li><a href="/">INTRIGUING NAMES</a></li>
                      <li><a href="/">NAMES BY CATEGORY</a></li>
                      <li><a href="/">VISUAL NAME SEARCH</a></li>
                      <li className={styles.last}>
                        <a href="/">
                            SELL YOUR
                            DOMAINS
</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>BLOG</span>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                    />
                    <ul>
                      <li><a href="/">ULTIMATE NAMING GUIDE</a></li>
                      <li><a href="/">POETIC DEVICES IN BUSINESS NAMING</a></li>
                      <li><a href="/">CROWDED BAR THEORY</a></li>
                      <li className={styles.last}>
                        <a href="/">ALL ARTICLES</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              {props.data && props.data.role === CONSTANTS.CUSTOMER
                        && <div className={styles.startContestBtn} onClick={startContests}>START CONTEST</div>}
            </div>
          </div>
        </div>
      );
    }

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
