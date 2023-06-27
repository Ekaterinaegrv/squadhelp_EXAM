import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUserAction(data)),
  });

  const Hoc = () => {
    useEffect(() => {
      if (!this.props.data) {
        this.props.getUser(this.props.history.replace);
      }}, [])
    
      return (
        <>
          {this.props.isFetching ? <Spinner />
            : <Component history={this.props.history} match={this.props.match} {...props} />}
        </>
      );
  }

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
