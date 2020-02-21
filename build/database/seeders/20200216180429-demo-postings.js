'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        let demoArr = [];
        let type_id;
        for (let i = 0; i <= 100; i++) {
            if (i < 25) {
                type_id = 1;
            }
            else if (i < 50) {
                type_id = 2;
            }
            else if (i < 75) {
                type_id = 3;
            }
            else {
                type_id = 4;
            }
            demoArr.push({
                title: 'title' + i,
                likes: Math.floor(Math.random() * 10),
                type_id,
                user_id: Math.floor(Math.random() * 15) + 1,
            });
        }
        return queryInterface.bulkInsert('Postings', demoArr);
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
