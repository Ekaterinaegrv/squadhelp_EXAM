const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);

  try {
    const participants = [req.tokenData.userId, req.body.recipient];
    participants.sort((participant1, participant2) => participant1 - participant2);
    let newConversation;
    let createMessage;
    newConversation = await db.Conversation.findOne({
      where: {
        participant1:participants[0], 
        participant2:participants[1] 
      }
    });
    if(newConversation) { 
      createMessage = await db.Message.create({
        sender: req.tokenData.userId,
        body: req.body.messageBody,
        conversation: newConversation.id
    })
    } else {
      newConversation = await db.Conversation.create( { 
        participant1:participants[0], 
        participant2:participants[1]    
      } );
      createMessage = await db.Message.create({
        sender: req.tokenData.userId,
        body: req.body.messageBody,
        conversation: newConversation.id
        })
    }  
    createMessage.participants = participants;

     const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
 
    const preview = {
      _id: newConversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: createMessage.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    const message = {};
    message._id = createMessage.id;
    message.sender = createMessage.sender;
    message.body = createMessage.body;
    message.conversation = createMessage.id;
    message.createdAt = createMessage.createdAt;
    message.updatedAt = createMessage.updatedAt;
    message.participants = createMessage.participants;


    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
    let conversationsMessage;
  try {
    conversationsMessage = await db.Conversation.findOne({
      where: {
        participant1:participants[0], 
        participant2:participants[1] 
      }
    });
    if(!conversationsMessage) {
      conversationsMessage = await db.Conversation.create( { 
        participant1:participants[0], 
        participant2:participants[1]    
      } );
    }
    const messageArray = await db.Message.findAll({
      order: [['createdAt', 'ASC']],
    where: {
      conversation: conversationsMessage.dataValues.id
    }
  })    
    const messages = [];
    messageArray.map(message => messages.push(message.dataValues));

    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => { 
  try {
    const conversationsArray = await db.Conversation.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { participant1: req.tokenData.userId },
          { participant2: req.tokenData.userId }
        ]
      },
      include: [
        {
          model: db.Message,
          required: true,
          order: [['createdAt', 'DESC']], 
          limit: 1,
          offset: 0
        },
      ],
    });

    if(conversationsArray.length !== 0){ 
      let conversations = [];

      for (let i = 0; i < conversationsArray.length; i++) {
        if(conversationsArray[i].dataValues.Messages.length > 0) {
          let newObj = {};
          newObj._id = conversationsArray[i].dataValues.id;
          newObj.sender = conversationsArray[i].dataValues.Messages[0].dataValues.sender;
          newObj.text = conversationsArray[i].dataValues.Messages[0].dataValues.body;
          newObj.createAt = conversationsArray[i].dataValues.Messages[0].dataValues.createdAt;
          newObj.participants = [conversationsArray[i].dataValues.participant1, conversationsArray[i].dataValues.participant2];
          newObj.blackList = conversationsArray[i].dataValues.blackList;
          newObj.favoriteList = conversationsArray[i].dataValues.favoriteList;
        
          conversations.push(newObj);
        }
      }
      const interlocutors = [];
  
      conversations.forEach(conversation => {
        interlocutors.push(conversation.participants.find(
          (participant) => participant !== req.tokenData.userId));
      });
      const senders = await db.User.findAll({
        where: {
          id: interlocutors,
        },
        attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
      });

      conversations.forEach((conversation) => {
        senders.forEach(sender => {
          if (conversation.participants.includes(sender.dataValues.id)) {
            conversation.interlocutor = {
              id: sender.dataValues.id,
              firstName: sender.dataValues.firstName,
              lastName: sender.dataValues.lastName,
              displayName: sender.dataValues.displayName,
              avatar: sender.dataValues.avatar,
            };
          }
        });
      });
      res.send(conversations);
    } 
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const indexOfUser = req.body.participants.indexOf(req.tokenData.userId);

  try {
    const conversation = await db.Conversation.findOne({
      where: {
        participant1: req.body.participants[0],
        participant2: req.body.participants[1]
      }
    })
    let blackListNew = conversation.blackList;
    blackListNew[indexOfUser] = req.body.blackListFlag;
    const updatedChat = await db.Conversation.update({ 
      blackList: blackListNew 
    },{ 
      where: { 
        id: conversation.id, 
      } , 
      returning: true
    });     
      
    const updatedChatPath = updatedChat.flat()[1].dataValues
    const chat = {};
    chat.participants = req.body.participants;
    chat.blackList = updatedChatPath.blackList;
    chat.favoriteList =  updatedChatPath.favoriteList;
    chat._id = updatedChatPath.id;
    chat.createdAt = updatedChatPath.createdAt;
    chat.updatedAt = updatedChatPath.updatedAt;
    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const indexOfUser = req.body.participants.indexOf(req.tokenData.userId);

  try {
    const conversation = await db.Conversation.findOne({
      where: {
        participant1: req.body.participants[0],
        participant2: req.body.participants[1]
      }
    })
    let favoriteListNew = conversation.favoriteList;
    favoriteListNew[indexOfUser] = req.body.favoriteFlag;
    const updatedChat = await db.Conversation.update({ 
      favoriteList: favoriteListNew 
    },{ 
      where: { 
        id: conversation.id, 
      } , 
      returning: true
    });     
      
    const updatedChatPath = updatedChat.flat()[1].dataValues
    const chat = {};
    chat.participants = req.body.participants;
    chat.blackList = updatedChatPath.blackList;
    chat.favoriteList =  updatedChatPath.favoriteList;
    chat._id = updatedChatPath.id;
    chat.createdAt = updatedChatPath.createdAt;
    chat.updatedAt = updatedChatPath.updatedAt; 
    res.send(chat);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  
  } catch (err) {
    res.send(err);
  }
};

const getCatalog = (catalogs) => {
  let catalog = {};
  catalog.chats = []; 
  if(catalogs.Conversations.length === 0){
    catalog._id = catalogs.dataValues.id;
    catalog.userId = catalogs.dataValues.userId;
    catalog.catalogName = catalogs.dataValues.catalogName;

  } else {
  for (let i = 0; i < catalogs.Conversations.length; i++) {
      catalog._id = catalogs.dataValues.id;
      catalog.userId = catalogs.dataValues.userId;
      catalog.catalogName = catalogs.dataValues.catalogName;
      catalog.chats.push(catalogs.Conversations[i].dataValues.id);
  }
  }
    return catalog; 
};


const getCatalogsList = (catalogs) => {
  let conversations = [];
    for (let i = 0; i < catalogs.length; i++) {
      let newObj = {};
      newObj.chats = [];
      if(catalogs[i].Conversations.length === 0){
          newObj._id = catalogs[i].dataValues.id;
          newObj.catalogName = catalogs[i].dataValues.catalogName;
      } else {
        for (let j = 0; j < catalogs[i].dataValues.Conversations.length; j++) {
          newObj._id = catalogs[i].dataValues.id;
          newObj.catalogName = catalogs[i].dataValues.catalogName;
          newObj.chats.push(catalogs[i].dataValues.Conversations[j].dataValues.id) 
        }
      }
     conversations.push(newObj);
    }
    return conversations; 
};
module.exports.createCatalog = async (req, res, next) => { 
  try {
    const createCatalog = await db.Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName
    });

    const conversations =  await db.Conversation.findByPk(req.body.chatId);

    await createCatalog.addConversations(conversations);

    const catalogs = await db.Catalog.findOne( { 
      where: { 
        id: createCatalog.id
     },
     include: [
      {
        model: db.Conversation,
      },
    ]
    });  
    const catalog = getCatalog(catalogs); 
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
      const updatedCatalog = await db.Catalog.update({ 
      catalogName: req.body.catalogName 
    },{ 
      where: { 
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      returning: true
    });   
    
    const catalogs = await db.Catalog.findOne({
      where: { 
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      include: [
        {
          model: db.Conversation,
        },
      ]
    })
    const catalog = getCatalog(catalogs);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const updatedCatalog = await db.Catalog.findOne({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId
      }
    });
    const conversation = await db.Conversation.findOne({
      where: {
        id: req.body.chatId 
      }
    })
    await updatedCatalog.addConversations(conversation);
    const catalogs = await db.Catalog.findOne({
      where: { 
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
      include: [
        {
          model: db.Conversation,
        },
      ]
    });

    const catalog = getCatalog(catalogs);
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const chatForDelete = await db.Conversation.findOne( { 
      where: { 
        id: req.body.chatId
     }
    });  
    const catalogForDelete = await db.Catalog.findOne( { 
      where: { 
        id: req.body.catalogId
     }
    });  
 
    await catalogForDelete.removeConversation(chatForDelete);

    const catalogs = await db.Catalog.findOne( { 
      where: { 
        id: req.body.catalogId
     },
     include: [
      {
        model: db.Conversation,
      },
    ],
    });  
    
    const catalog = getCatalog(catalogs);
  
    res.send(catalog);

  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
try {
  const deleteCatalog = await db.Catalog.findOne({
    where: {
      id: req.body.catalogId, 
      userId: req.tokenData.userId 
    }
  });

  await deleteCatalog.destroy();

  const catalogs = await db.Catalog.findAll({
    where: {
      userId: req.tokenData.userId 
    },
    include: [
      {
        model: db.Conversation,
      }
    ],
  });

  const conversations = getCatalogsList(catalogs);
  res.send(conversations);

} catch (err) {
  next(err);
}
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalog.findAll({
      where: {
        userId: req.tokenData.userId
      },
      include: [
        {
          model: db.Conversation,
          order: [['createdAt']] 
        },
      ],
    });
    const conversations = getCatalogsList(catalogs);
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};