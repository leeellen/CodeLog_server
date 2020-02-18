'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [
      {
        name: 'content',
        typeid: 1,
      },
    ];
    ['fact', 'feeling', 'finding', 'futureAction'].map((el) => {
      demoArr.push({
        name: el,
        typeid: 2,
      });
    });
    ['concept', 'background', 'definition', 'example', 'precautions', 'recommend'].map((el) => {
      demoArr.push({
        name: el,
        typeid: 3,
      });
    });
    ['concept', 'strategy', 'difficulty', 'reference', 'lesson'].map((el) => {
      demoArr.push({
        name: el,
        typeid: 4,
      });
    });
    return queryInterface.bulkInsert('Subtitles', demoArr);
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
