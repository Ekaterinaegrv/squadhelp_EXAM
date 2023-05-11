'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      Message.belongsTo(models.Conversation, { foreignKey: 'conversation', sourceKey: 'id' });   
      Message.belongsTo(models.User, { foreignKey: 'sender', sourceKey: 'id' });   
    }
  };
  Message.init({
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    conversation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages',
    underscored: true
    });
  return Message;
};