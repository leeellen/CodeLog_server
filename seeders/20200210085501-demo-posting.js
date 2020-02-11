'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoArr = [];
    for (let i = 0; i < 15; i++) {
      demoArr.push({
        title: 'apple pie',
        content:
          i +
          'What’s the most difficult journey you have ever done? What happened? For example, your car broke down, your flight was cancelled, your bus had an accident, etc.I travelled to China last year. My connecting flight was supposed to be about two hours later. So I was waiting in the airport waiting area. But the connecting flight didn’t arrive, and so I waited and waited. The waiting area was so crowded, and I didn’t have anywhere to sit. Because the flight was so delayed, the airline staff were giving free meals to people. But the food wasn’t very good. Because I had already checked in, I couldn’t go anywhere. After seven hours, I asked a member of staff about the delay, and she just told me “the plane is delayed”, with no other information. In the end the flight was 12 hours late. It was a terrible experience.',
        likes: Math.floor(Math.random() * 10),
        theme: ['plain', 'til', 'tech', 'dev'][Math.floor(Math.random() * 3)],
        userid: Math.floor(Math.random() * 14) + 1,
      });
    }
    return queryInterface.bulkInsert('postings', demoArr);
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
