'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [
      { name: 'React' },
      { name: 'Redux' },
      { name: 'Typescript' },
      { name: 'Node.js' },
      { name: 'Sequelize' },
      { name: 'Serverless' },
      { name: 'Hooks' },
      { name: 'Javascript' },
    ];
    return queryInterface.bulkInsert('Tags', demoArr);
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
