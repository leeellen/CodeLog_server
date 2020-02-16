const asyncHandler = require('express-async-handler');

const { isValid } = require('../../utils/token');
const { postings, tags } = require('../../services');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { id } = req.body;
    const { token } = req.cookies;

    let decodeData = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid = decodeData.userData.id;

    let findresult = await postings.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }
    let postingInfo = findresult.payload;

    if (postingInfo.userid !== userid) {
      res.status(403).send('It is not your posting');
      return;
    }

    let deleteResult = await postings.delete(id);
    if (!deleteResult.success) {
      res.status(404).send("There's an error while updating your posting");
      return;
    }

    res.status(200).send('successfully deleted');
  }),
};
