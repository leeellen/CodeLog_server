const asyncHandler = require('express-async-handler');

const { postings, companies } = require('../../services');

module.exports = {
  get: asyncHandler(async (req, res) => {
    let posts = {
      new_post: [],
      recommended_post: [],
      new_company: [],
    };
    let userid = 105;
    while (posts.new_post.length < 10) {
      const findResult = await postings.find(userid);
      if (findResult.success) {
        posts.new_post.push(findResult.payload);
      }
      userid--;
    }
    for (let i = 0; i < 10; i++) {
      const findResult = await postings.find(Math.floor(Math.random() * 14) + 1);
      if (findResult.success) {
        posts.recommended_post.push(findResult.payload);
      }
    }
    let companyid = 20;
    while (posts.new_company.length < 10) {
      const findResult = await companies.find(companyid);
      if (findResult.success) {
        posts.new_company.push(findResult.payload);
      }
      companyid--;
    }
    res.status(200).send(posts);
  }),
};
