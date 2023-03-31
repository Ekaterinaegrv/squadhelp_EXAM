'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Conversation.init({
    participants: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    blackList: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    favoriteList: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversations'
  });
  return Conversation;
};