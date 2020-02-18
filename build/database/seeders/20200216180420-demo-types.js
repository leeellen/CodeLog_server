'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        let demoArr = ['plain', 'til', 'tech', 'dev'];
        demoArr = demoArr.map((el) => {
            return { name: el };
        });
        return queryInterface.bulkInsert('Types', demoArr);
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
