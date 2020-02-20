'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    for (let i = 0; i < 15; i++) {
      demoArr.push({
        email: `user${i}@gmail.com`,
        username: 'user' + i,
        password: i,
        company_id: Math.floor(Math.random() * 14) + 1,
        position: '',
        certificate: 'im16',
        personal_homepage: '',
      });
    }
    return queryInterface.bulkInsert('Users', demoArr);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
