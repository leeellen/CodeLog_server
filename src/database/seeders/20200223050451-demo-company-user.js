'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    for (let i = 0; i < 15; i++) {
      demoArr.push({
        company_id: Math.floor(Math.random() * 14) + 1,
        tag_id: Math.floor(Math.random() * 6) + 9,
      });
    }
    return queryInterface.bulkInsert('companies_tags', demoArr);
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
