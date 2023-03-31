import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import LoginPage from '../LoginPage/LoginPage';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from '../LoginPage/LoginPage.module.sass'

const Dashboard = (props) => {
  const { role, history } = props;
  console.log(role);

  const dashboardRender = () => {
    if(role) {
      switch(role) {
        case CONSTANTS.CUSTOMER:{
          return (<CustomerDashboard history={history} match={props.match} />)
        }
        case CONSTANTS.CREATOR:{
          return (<CreatorDashboard history={history} match={props.match} />)
        }
        case CONSTANTS.MODERATOR:{
          return (<CustomerDashboard history={history} match={props.match} role={props.role}/>)
        } }
    } else {
        return (
          <div className={styles.mainContainer}>
          <div className={styles.loginContainer}>
            <div className={styles.loginFormContainer}>
              <LoginForm history={history} />
            </div>
          </div>
        </div>
        )
    }
  } 

  return (
    <div>
      <Header />
      {dashboardRender()}     
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
