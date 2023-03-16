import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';

const Dashboard = (props) => {
  const { role, history } = props;


  const dashboardRender = () => {
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
