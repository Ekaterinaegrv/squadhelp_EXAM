const db = require('../models');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const {rejectOffer, resolveOffer, allowOrBlockOffer} = require('./services/contestServices');

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
  const typesForCustomer = [CONSTANTS.OFFER_STATUS_PENDING, CONSTANTS.OFFER_STATUS_WON, CONSTANTS.OFFER_STATUS_REJECTED].filter(Boolean);
  const typesForModeratorOrCreator = [
    CONSTANTS.OFFER_STATUS_PENDING, 
    CONSTANTS.OFFER_STATUS_WON, 
    CONSTANTS.OFFER_STATUS_REJECTED, 
    CONSTANTS.OFFER_STATUS_NEW, 
    CONSTANTS.OFFER_STATUS_BLOCK
  ].filter(Boolean);

  const creator = req.tokenData.role === CONSTANTS.CREATOR ? { userId: req.tokenData.userId,  status: typesForModeratorOrCreator } : {};
  const customer = req.tokenData.role === CONSTANTS.CUSTOMER ? { status: typesForCustomer } : {};
  const moderator = req.tokenData.role === CONSTANTS.MODERATOR ? { status: typesForModeratorOrCreator } : {};
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


module.exports.setOfferStatus = async (req, res, next) => {
  let transaction; 
  if (req.body.command === CONSTANTS.OFFER_STATUS_REJECTED) {
    try {
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
        req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } if (req.body.command === CONSTANTS.OFFER_STATUS_RESOLVE) {
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
  } if (req.body.command === CONSTANTS.OFFER_STATUS_PENDING || req.body.command === CONSTANTS.OFFER_STATUS_BLOCK) {
    try {     
      const updatedOffers = await allowOrBlockOffer(req.body.offerId, req.body.email, req.body.title, req.body.command);
      res.send(updatedOffers);
      } catch (err) {
      next(err);
    }
  } 
};

module.exports.getCustomersContests = (req, res, next) => {
  db.Contest.findAll({
    where: req.tokenData.role === CONSTANTS.MODERATOR ? { status: req.headers.status } : {status: req.headers.status, userId: req.tokenData.userId},
    limit: req.params.limit,
    offset: req.params.offset ? req.params.offset : 0,
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
  const conts = db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.params.limit,
    offset: req.params.offset ? req.params.offset : 0,
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
    console.log('*********************** 11112222   - conts -   11112222');
  console.log('conts');
    console.log(conts);
};
