'use strict';

const { BOOLEAN } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      participant1: {
        field: 'participant_1',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      participant2: {
        field: 'participant_2',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      blackList: {
        field: 'black_list',
        allowNull: false,
        type: Sequelize.ARRAY(BOOLEAN),
        defaultValue: [false, false]
      },
      favoriteList: {
        field: 'favorite_list',
        allowNull: false,
        type: Sequelize.ARRAY(BOOLEAN),
        defaultValue: [false, false]
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations');
  }
};