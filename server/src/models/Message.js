'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      /*
      User.hasMany(models.Task, { --> belongsTo {}
        foreignKey: 'userId'
      });
      User.belongsToMany(models.Group, { --> belongsToMany
        through: 'users_to_groups',
        foreignKey: 'userId'
      });
      Task.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      references: {
        model: 'User',
        key: 'id'
      }
      
      */


      Message.belongsToMany(models.User, {
        through: 'messages_to_users',
        foreingKey: 'sender'
      });
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
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages'
  });
  return Message;
};