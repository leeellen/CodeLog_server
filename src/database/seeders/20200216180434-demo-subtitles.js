'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [
      {
        name: 'content',
        type_id: 1,
      },
    ];
    ['til_fact', 'til_feeling', 'til_finding', 'til_futureAction'].map((el) => {
      demoArr.push({
        name: el,
        type_id: 2,
      });
    });
    [
      'tech_concept',
      'tech_background',
      'tech_definition',
      'tech_example',
      'tech_precautions',
      'tech_recommend',
    ].map((el) => {
      demoArr.push({
        name: el,
        type_id: 3,
      });
    });
    ['dev_concept', 'dev_strategy', 'dev_difficulty', 'dev_reference', 'dev_lesson'].map((el) => {
      demoArr.push({
        name: el,
        type_id: 4,
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
