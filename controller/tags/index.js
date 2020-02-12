const asyncHandler = require('express-async-handler');

const { tags } = require('../../services');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const getTagResult = await tags.getAllTags();
    if (!getTagResult.success) {
      res.status(404).send("There's an error while finding tags");
      return;
    }
    res.status(200).send(getTagResult.payload);
  }),
};
