const asyncHandler = require('express-async-handler');

const { users } = require('../../services');
const th = require('../../utils/token');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let userData = await users.find(email, password);
    if (!userData.success) {
      res.status(404).send(`User with ${email} doesn't exist`);
      return;
    }
    if (!userData.payload) {
      res.status(403).send(`wrong password`);
      return;
    }

    let token = await th.tokenGenerator({ id: userData.payload.id });

    res
      .cookie('token', token)
      .status(200)
      .send('Token generated');
  }),
};
