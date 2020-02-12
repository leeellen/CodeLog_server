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

    let tagfindresult = await tags.findByPostId(id);
    if (!tagfindresult.success) {
      res.status(404).send("i found your postings, but i can't find posting tags");
      return;
    }
    postingInfo['tags'] = tagfindresult.payload;
    res.status(200).send(postingInfo);
  }),
};
