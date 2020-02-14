const asyncHandler = require('express-async-handler');

const { users, postings, tags } = require('../../services');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const id = req.params.id;

    let findResult = await postings.find(id);
    if (!findResult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }
    let postingInfo = findResult.payload;

    const userid = findResult.payload.userid;

    const userfindResult = await users.findById(userid);
    if (!userfindResult.success) {
      res.status(404).send("i found your postings, but i can't find writer");
      return;
    }
    const { email, username, rank, completion } = userfindResult.payload;
    postingInfo['users'] = { email, username, rank, completion };

    let tagfindResult = await tags.findNamesByPostId(id);
    if (!tagfindResult.success) {
      res.status(404).send("i found your postings, but i can't find posting tags");
      return;
    }
    postingInfo['tags'] = tagfindResult.payload;

    res.status(200).send(postingInfo);
  }),
};
