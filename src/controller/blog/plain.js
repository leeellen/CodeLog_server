const asyncHandler = require('express-async-handler');

const { isValid } = require('../../utils/token');
const { postings, tags } = require('../../services');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const { token } = req.cookies;

    let decodeData = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid = decodeData.userData.id;

    let posts = {};
    const findResult = await postings.findPlain(userid);
    if (!findResult.success) {
      res.status(404).send(`There's an error while finding your posts`);
      return;
    }
    posts['posts'] = findResult.payload;

    res.status(200).send(posts);
  }),
};
