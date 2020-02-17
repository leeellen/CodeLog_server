'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        let demoArr = [];
        let theme;
        for (let i = 0; i < 100; i++) {
            if (i < 25) {
                theme = 'plain';
            }
            else if (i < 50) {
                theme = 'til';
            }
            else if (i < 75) {
                theme = 'tech';
            }
            else {
                theme = 'dev';
            }
            demoArr.push({
                title: 'title' + i,
                likes: Math.floor(Math.random() * 10),
                theme,
                userid: Math.floor(Math.random() * 15) + 1,
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
