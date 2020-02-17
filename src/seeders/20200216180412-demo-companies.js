'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    demoArr.push({
      code: '',
      name: 'independent',
      ispartner: 0,
      bname: '',
      eid: '',
      homepage: '',
    });
    for (let i = 0; i < 15; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        demoArr.push({
          code: `${i}`.repeat(9),
          name: 'company' + i,
          info: 'it is company info' + i,
          ispartner: true,
          bname: 'bname' + i,
          eid: '999-99-9999' + i,
          homepage: `https://company${i}.com/`,
        });
      } else {
        demoArr.push({
          code: null,
          name: 'company' + i,
          ispartner: false,
          bname: 'bname' + i,
          eid: '999-99-9999' + i,
          homepage: `https://company${i}.com/`,
        });
      }
    }
    return queryInterface.bulkInsert('Companies', demoArr);
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
