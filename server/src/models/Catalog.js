'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate(models) {
      Catalog.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      Catalog.belongsToMany(models.Conversation, { through: 'conversations_to_catalogs', foreignKey: 'catalog_id' });
    }
  };
  Catalog.init({
    userId: {
      type: DataTypes.INTEGER
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Catalog',
    tableName: 'catalogs',
    underscored: true
    });
  return Catalog;
};