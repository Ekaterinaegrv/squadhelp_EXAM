'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
  
    static associate(models) {
      Conversation.hasMany(models.Message, { foreignKey: 'conversation', sourceKey: 'id' });   
      Conversation.belongsToMany(models.Catalog, { through: 'conversations_to_catalogs', foreignKey: 'conversation_id' });
      Conversation.belongsTo(models.User, { foreignKey: 'participant1', sourceKey: 'id' });
      Conversation.belongsTo(models.User, { foreignKey: 'participant2', sourceKey: 'id' });
    }
  };
  Conversation.init({
    participant1: {
      field: 'participant_1',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    participant2: {
      field: 'participant_2',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    blackList: {
      field: 'black_list',
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      defaultValue: [false, false]
    },
    favoriteList: {
      field: 'favorite_list',
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      defaultValue: [false, false]
    },
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'Conversations',
    underscored: true
  });
  return Conversation;
};