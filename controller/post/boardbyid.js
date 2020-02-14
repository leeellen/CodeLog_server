const asyncHandler = require('express-async-handler');

const { postings, tags } = require('../../services');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const id = req.params.id;

    let findresult = await postings.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }
    let postingInfo = findresult.payload;

    const userid = findResult.payload.userid;

    const userfindResult = await users.findById(userid);
    if (!userfindResult.success) {
      res.status(404).send("i found your postings, but i can't find writer");
      return;
    }
    const { email, username, rank, completion } = userfindResult;
    postingInfo['users'] = { email, username, rank, completion };

    let tagfindresult = await tags.findNamesByPostId(id);
    if (!tagfindresult.success) {
      res.status(404).send("i found your postings, but i can't find posting tags");
      return;
    }
    postingInfo['tags'] = tagfindresult.payload;

    res.status(200).send(postingInfo);
  }),
};
