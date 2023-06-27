import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { onlyForNotAuthorize } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (data) => dispatch(onlyForNotAuthorize(data)),
  });

  const HocForLoginSignUp = (props) => {
    useEffect(() => {
      props.checkAuth(props.history.replace);
    }, []);

      if (props.isFetching) {
        return <Spinner />;
      } if (!props.data) {
        return <Component history={props.history} />;
      }
      return null;
  }

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
