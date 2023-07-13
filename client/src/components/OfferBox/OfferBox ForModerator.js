import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants/constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBoxForModerator = (props) => { 
  const findConversationInfo = () => {
    const { messagesPreview, id } = props;
    const participants = [id, props.data.User.id];
    participants.sort((participant1, participant2) => participant1 - participant2);
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const allowOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, CONSTANTS.OFFER_STATUS_PENDING),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const blockOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, CONSTANTS.OFFER_STATUS_BLOCK),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMark = (value) => {
    props.clearError();
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = props.data;
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return <i className={classNames(styles.reject)}>Rejected</i>;
    } if (status === CONSTANTS.OFFER_STATUS_WON) {
      return <i className={classNames(styles.resolve)}>Won</i>;
    } if (status === CONSTANTS.OFFER_STATUS_BLOCK) {
      return <i className={classNames(styles.reject)}>Block</i>;
    } if (status === CONSTANTS.OFFER_STATUS_PENDING) {
      return <i className={classNames(styles.resolve)}>Allow by moderator</i>;
    } if (status === CONSTANTS.OFFER_STATUS_NEW) {
      return <i className={classNames( styles.newOffer)}>New offer</i>;
    } 

    return null;
  };

  const goChat = () => {
    props.goToExpandedDialog({ interlocutor: props.data.User, conversationData: findConversationInfo() });
  };

  const {
    data, role, id, contestType,
  } = props;
  const {
    avatar, firstName, lastName, email, rating,
  } = props.data.User; 
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
)}
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {
                        contestType === CONSTANTS.LOGO_CONTEST
                          ? (
                            <img
                              onClick={() => props.changeShowImage({ imagePath: data.fileName, isShowOnFull: true })}
                              className={styles.responseLogo}
                              src={`${CONSTANTS.publicURL}${data.fileName}`}
                              alt="logo"
                            />
                          )
                          : <span className={styles.response}>{data.text}</span>
                    }
          {data.User.id !== id && (
          <Rating
            fractions={2}
            fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
            placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
            emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt="star" />}
            onClick={changeMark}
            placeholderRating={data.mark}
          />
          )}
        </div>
        {role !== CONSTANTS.CREATOR && <i onClick={goChat} className={classNames("fas fa-comments", styles.comments)} />}
      </div>


    {props.needButtons(data.status) && (
    <div className={styles.btnsContainer}>
      <div onClick={allowOffer} className={styles.resolveBtn}>Allow</div>
      <div onClick={blockOffer} className={styles.rejectBtn}>Block</div>
    </div>
    )}
    </div>
    

  );
};

const mapDispatchToProps = (dispatch) => ({
  changeMark: (data) => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

const mapStateToProps = (state) => {
  const { changeMarkError, isShowModal } = state.contestByIdStore;
  const { id, role } = state.userStore.data;
  const { messagesPreview } = state.chatStore;
  return {
    changeMarkError, id, role, messagesPreview, isShowModal,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBoxForModerator));
