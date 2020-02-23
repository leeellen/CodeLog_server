'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let StackArr = [
      'React',
      'Redux',
      'Typescript',
      'Node.js',
      'Sequelize',
      'Serverless',
      'Hooks',
      'Javascript',
    ];
    StackArr = StackArr.map((el) => {
      return {
        name: el,
        type: 'stack',
      };
    });

    let CompanyArr = ['야근없음', '연봉삼천', '가족분위기', '성장도모', '스타트업', '애자일협업'];

    CompanyArr = CompanyArr.map((el) => {
      return {
        name: el,
        type: 'company',
      };
    });

    return queryInterface.bulkInsert('Tags', StackArr.concat(CompanyArr));
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
