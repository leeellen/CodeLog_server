const asyncHandler = require('express-async-handler');

const { isValid } = require('../../utils/token');
const { users, postings, tags } = require('../../services');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const { token } = req.cookies;

    let decodeData = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid = decodeData.userData.id;

    const findUserResult = await users.findById(userid);
    if (!findUserResult.success) {
      res
        .clearCookie('token')
        .status(404)
        .send(`I'm not sure what user you logined to. Hmm. I just do logout for you`);
      return;
    }
    let userData = findUserResult.payload;

    const findPostingsResult = await postings.findAll(userData.id);
    if (!findPostingsResult.success) {
      res.status(404).send(`There's an error while finding your postings`);
      return;
    }
    userData['post_count'] = findPostingsResult.payload.length;

    let tagids = [];
    for (let posting of findPostingsResult.payload) {
      let findTagResult = await tags.findCountByPostId(posting.id);
      if (!findTagResult.success) {
        res.status(404).send(`There's an error while finding your posting tags`);
        return;
      }
      tagids = tagids.concat(findTagResult.payload);
    }
    userData['tags'] = [...new Set(tagids)];

    res.status(200).send(userData);
  }),
};
