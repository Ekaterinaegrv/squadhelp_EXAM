import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants/constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from '../LoginPage/LoginPage.module.sass'

const Dashboard = (props) => {
  const { role, history } = props;

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
        } 
        default: <LoginForm history={history} />
      }
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

const mapStateToProps = (state) => ({
  role: state.userStore.data ? state.userStore.data.role : null,
});
export default connect(mapStateToProps)(Dashboard);
