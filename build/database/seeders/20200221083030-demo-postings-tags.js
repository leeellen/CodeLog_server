'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        let demoArr = [];
        for (let i = 0; i < 50; i++) {
            demoArr.push({
                post_id: Math.floor(Math.random() * 99) + 1,
                tag_id: Math.floor(Math.random() * 7) + 1,
            });
        }
        return queryInterface.bulkInsert('postings_tags', demoArr);
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
