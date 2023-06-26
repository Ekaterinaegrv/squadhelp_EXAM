const db = require('../models');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { sendMailFromModerator } = require('../utils/mailToCreator');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { body: { characteristic1, characteristic2 } } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  const pending = 'pending';
  const won = 'won';
  const rejected = 'rejected';
  const newStatus = 'new';
  const block = 'block';
  const typesForCustomer = [pending, won, rejected].filter(Boolean);
  const typesForModerator = [pending, won, rejected, newStatus, block].filter(Boolean);
  const typesForCreator = [pending, won, rejected, newStatus, block].filter(Boolean);

  const creator = req.tokenData.role === CONSTANTS.CREATOR ? { userId: req.tokenData.userId,  status: typesForCreator } : {};
  const customer = req.tokenData.role === CONSTANTS.CUSTOMER ? { status: typesForCustomer } : {};
  const moderator = req.tokenData.role === CONSTANTS.MODERATOR ? { status: typesForModerator } : {};
  const offersTypes = [creator, customer, moderator].filter(Boolean);
            
  try {
      let contestInfo = await db.Contest.findOne({
        where: { id: req.headers.contestid },
        order: [
          [db.Offer, 'id', 'asc'],
        ],
        include: [
          {
            model: db.User,
            required: true,
            attributes: {
              exclude: [
                'password',
                'role',
                'balance',
                'accessToken',
              ],
            },
          },
          {
            model: db.Offer,
            required: false, 
            where: offersTypes, 

            attributes: { exclude: ['userId', 'contestId'] },
            include: [
              {
                model: db.User,
                required: true,
                attributes: {
                  exclude: [
                    'password',
                    'role',
                    'balance',
                    'accessToken',
                  ],
                },
              },
              {
                model: db.Rating,
                required: false,
                where: { userId: req.tokenData.userId },
                attributes: { exclude: ['userId', 'offerId'] },
              },
            ],
          },
        ],
      });
      contestInfo = contestInfo.get({ plain: true });
      contestInfo.Offers.forEach(offer => {
        if (offer.Rating) {
          offer.mark = offer.Rating.mark;
        }
        delete offer.Rating;
      });
      res.send(contestInfo);
      
    
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(
      req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  return rejectedOffer;
};
const resolveOffer = async (
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

const allowOffer = async (offerId, email, title, command) => {
  const updatedOffers = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_PENDING }, { id: offerId });

    await sendMailFromModerator({
      command,
      email,
      title
    });

    return updatedOffers; 
};

const blockOffer = async (offerId, email, title, command) => {
  const updatedOffers = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_BLOCK }, { id: offerId });

    await sendMailFromModerator({
      command,
      email,
      title
    });

    return updatedOffers; 
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction; 
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
        req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(req.body.contestId,  
        req.body.creatorId, req.body.orderId, req.body.offerId,
        req.body.priority, transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  } if (req.body.command === 'pending') {
    try {                                              
      const updatedOffers = await allowOffer(req.body.offerId, req.body.email, req.body.title, req.body.command);
      res.send(updatedOffers);
      } catch (err) {
      next(err);
    }
  } if (req.body.command === 'block') {
    try {
      const updatedOffers = await blockOffer(req.body.offerId, req.body.email, req.body.title, req.body.command);
      res.send(updatedOffers);
      } catch (err) {
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  db.Contest.findAll({
    where: req.tokenData.role === CONSTANTS.MODERATOR ? { status: req.headers.status } : {status: req.headers.status, userId: req.tokenData.userId},
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(req.body.typeIndex,
    req.body.contestId, req.body.industry, req.body.awardSort);
  db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: db.Offer,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError());
    });
};
