'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    for (let i = 0; i < 15; i++) {
      demoArr.push({
        email: `user${i}@gmail.com`,
        username: 'user' + i,
        password: i,
        companyid: 0,
        rank: '',
        completion: 'im16',
        website: '',
      });
    }
    return queryInterface.bulkInsert('Users', demoArr);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
