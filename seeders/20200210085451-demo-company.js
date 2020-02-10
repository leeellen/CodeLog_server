'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    for (let i = 0; i < 15; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        demoArr.push({
          code: `${i}`.repeat(9),
          name: 'company' + i,
          ispartner: 1,
          mutual: 'mutual' + i,
          eid: '999-99-9999' + i,
          homepage: `https://company${i}.com/`,
        });
      } else {
        demoArr.push({
          code: null,
          name: 'company' + i,
          ispartner: 0,
          mutual: 'mutual' + i,
          eid: '999-99-9999' + i,
          homepage: `https://company${i}.com/`,
        });
      }
    }
    return queryInterface.bulkInsert('companies', demoArr);
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
