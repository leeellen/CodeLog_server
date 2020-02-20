'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    demoArr.push({
      code: '',
      name: 'independent',
      partner: false,
      business_name: '',
      eid: '',
      company_homepage: '',
    });
    for (let i = 0; i < 15; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        demoArr.push({
          code: `${i}`.repeat(9),
          name: 'company' + i,
          info: 'it is company info' + i,
          partner: true,
          business_name: 'bname' + i,
          eid: '999-99-9999' + i,
          company_homepage: `https://company${i}.com/`,
        });
      } else {
        demoArr.push({
          code: null,
          name: 'company' + i,
          partner: false,
          business_name: 'bname' + i,
          eid: '999-99-9999' + i,
          company_homepage: `https://company${i}.com/`,
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
