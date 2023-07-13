const db = require('../../models');
const contestQueries = require('../queries/contestQueries');
const userQueries = require('../queries/userQueries');
const controller = require('../../socketInit');
const CONSTANTS = require('../../constants');
const { sendMailFromModerator } = require('../../utils/mailToCreator');

 module.exports.rejectOffer = async (offerId, creatorId, contestId) => {
    const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
    return rejectedOffer;
};
 module.exports.resolveOffer = async (
    contestId, creatorId, orderId, offerId, priority, transaction) => {
    const finishedContest = await contestQueries.updateContestStatus({
    status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
    1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
    }, { orderId }, transaction);
    await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
    const updatedOffers = await contestQueries.updateOfferStatus({
        status: db.sequelize.literal(` CASE
                WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
                WHEN "status"='${ CONSTANTS.OFFER_STATUS_NEW }' THEN '${ CONSTANTS.OFFER_STATUS_BLOCK }'
                WHEN "status"='${ CONSTANTS.OFFER_STATUS_PENDING }' THEN '${ CONSTANTS.OFFER_STATUS_REJECTED }'
                WHEN "status"='${ CONSTANTS.OFFER_STATUS_BLOCK }' THEN '${ CONSTANTS.OFFER_STATUS_BLOCK }'
                ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED}'
                END
        `),
    }, {
    contestId,
    }, transaction);
    transaction.commit();
    const arrayRoomsId = [];
    let updatedOffer;
    updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
        offer.userId) {
        arrayRoomsId.push(offer.userId);
    } 
    if(offer.status === CONSTANTS.OFFER_STATUS_WON) {
        updatedOffer = offer;
    }
    });
    if (arrayRoomsId.length > 0) {
    controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
        'Someone of yours offers was rejected', contestId);
    }
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);
    return updatedOffer;
};
  
module.exports.allowOrBlockOffer = async (offerId, email, title, command) => {
    const updatedOffers = await contestQueries.updateOffer(
      { status: command === 'pending' ? CONSTANTS.OFFER_STATUS_PENDING : CONSTANTS.OFFER_STATUS_BLOCK}, { id: offerId });
   
      await sendMailFromModerator({
        command,
        email,
        title
      });
  
      return updatedOffers; 
  };