const CONSTANTS = require('../constants');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'James',
        lastName: 'Doe',
        displayName: 'James_moderator',
        password: await bcrypt.hash('moderator77', CONSTANTS.SALT_ROUNDS),
        email: 'moderator@squadhelp.com',
        avatar: 'anon.png',
        role: 'moderator',
        balance: 0,
        accessToken: '',
        rating: 0
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John_creator',
        password: await bcrypt.hash('creator77', CONSTANTS.SALT_ROUNDS),
        email: 'johncreator@squadhelp.com',
        avatar: 'anon.png',
        role: 'creator',
        balance: 300,
        accessToken: '',
        rating: 0
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        displayName: 'Jane_customer',
        password: await bcrypt.hash('customer77', CONSTANTS.SALT_ROUNDS),
        email: 'janecustomer@squadhelp.com',
        avatar: 'anon.png',
        role: 'customer',
        balance: 300,
        accessToken: '',
        rating: 0
      },
     
    ], {});
  },

};
