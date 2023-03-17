'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Catalog.init({
    userId: {
      type: DataTypes.INTEGER
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chats: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Catalog',
    tableName: 'catalogs',
    underscored: true
    });
  return Catalog;
};