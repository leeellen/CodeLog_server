'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    for (let i = 0; i < 15; i++) {
      demoArr.push({
        username: 'user' + i,
        password: i,
        companyid: 0,
        rank: '',
        completion: 'im16',
      });
    }
    return queryInterface.bulkInsert('Users', demoArr);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
