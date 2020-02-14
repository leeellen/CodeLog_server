const asyncHandler = require('express-async-handler');

const { isValid } = require('../../utils/token');
const { postings, tags, users } = require('../../services');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { theme, title, content, selected_tags } = req.body;
    const { token } = req.cookies;

    let decodeData = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid = decodeData.userData.id;

    let postresult = await postings.create(userid, title, content, 0, theme);
    if (!postresult.success) {
      res.status(404).send("i can't upload your postings");
      return;
    }
    const postid = postresult.payload.id;

    let tagids = [];
    for (let i = 0; i < selected_tags.length; i++) {
      let findresult = await tags.findByName(selected_tags[i]);
      if (!findresult.success) {
        res
          .status(404)
          .send("i saved your postings, but i can't find your tag " + selected_tags[i]);
        return;
      }
      tagids.push(findresult.payload.id);
    }

    let addresult = await postings.addTags(postid, tagids);
    if (!addresult.success) {
      res.status(404).send("i saved your postings, but i can't put your tags in");
      return;
    }

    res.status(201).send('Posting successfully created!');
  }),
  get: asyncHandler(async (req, res) => {
    const { id } = req.body;

    const findResult = await postings.find(id);
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

    const tagfindResult = await tags.findNamesByPostId(id);
    if (!tagfindResult.success) {
      res.status(404).send("i found your postings, but i can't find posting tags");
      return;
    }
    postingInfo['tags'] = tagfindResult.payload;

    res.status(200).send(postingInfo);
  }),
};
