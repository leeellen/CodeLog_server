'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        let demoArr = [];
        for (var i = 1; i <= 25; i++) {
            demoArr.push({
                post_id: i,
                subtitle_id: 1,
                body: i +
                    'What’s the most difficult journey you have ever done? What happened? For example, your car broke down, your flight was cancelled, your bus had an accident, etc.I travelled to China last year. My connecting flight was supposed to be about two hours later. So I was waiting in the airport waiting area. But the connecting flight didn’t arrive, and so I waited and waited. The waiting area was so crowded, and I didn’t have anywhere to sit. Because the flight was so delayed, the airline staff were giving free meals to people. But the food wasn’t very good. Because I had already checked in, I couldn’t go anywhere. After seven hours, I asked a member of staff about the delay, and she just told me “the plane is delayed”, with no other information. In the end the flight was 12 hours late. It was a terrible experience.',
            });
        }
        for (var i = 26; i <= 50; i++) {
            demoArr.push({
                post_id: i,
                subtitle_id: 2,
                body: `사실${i}: 페어프로그래밍에서 내가 한 행동을 객관적 적어보기`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 3,
                body: `느낌${i}: 그때 느꼈던 기분을 간략히 정리하기`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 4,
                body: `교훈${i}: 이번 페어프로그래밍 시간에 얻은 교훈을 적기`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 5,
                body: `행동${i}: 그래서 내가 앞으로 취할 행동을 미래형으로 적기`,
            });
        }
        for (var i = 51; i <= 75; i++) {
            demoArr.push({
                post_id: i,
                subtitle_id: 6,
                body: `:${i}: Blogging 할 개념 (주제는 하나로 뚜렷 하여야 합니다)`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 7,
                body: `:${i}:  해당 개념을 블로깅 하게된 배경`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 8,
                body: `:${i}:  해당 개념의 정의`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 9,
                body: `:${i}:  해당 개념의 정의 설명을 위한 예시 코드`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 10,
                body: `:${i}:  해당 개념을 사용할 때 주의하여야 하는 사항`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 11,
                body: `:${i}:  기타 해당 개념과 같이 보았으면 하는 개념`,
            });
        }
        for (var i = 76; i <= 100; i++) {
            demoArr.push({
                post_id: i,
                subtitle_id: 12,
                body: `:${i}:  어떠한 과제 및 프로젝트를 진행하는지 (작게는 기능 단위로 할 수 있습니다)`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 13,
                body: `:${i}:  어떠한 전략으로 코딩으로 하려 하는지`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 14,
                body: `:${i}:  진행 중에 어떠한 에러를 겪었는지 그리고 그 에러 코드는 무엇인지`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 15,
                body: `:${i}:  에러를 해결하기 위하여 자신이 찾은 키워드 및 레퍼런스`,
            });
            demoArr.push({
                post_id: i,
                subtitle_id: 16,
                body: `:${i}:  기능 구현 및 에러 해결을 통해 얻은 교훈은 무엇인지`,
            });
        }
        return queryInterface.bulkInsert('Contents', demoArr);
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
