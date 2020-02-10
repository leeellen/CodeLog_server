const asyncHandler = require('express-async-handler');

const { users } = require('../../services');
const th = require('../../utils/token');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let userData = await users.find(email, password);
    console.log(userData);

    if (userData.success && userData.message === 'exists') {
      let token = await th.tokenGenerator({ id: userData.payload.id });
      console.log(token);
      res.cookie('token', token);
      res.status(200).send('Token generated');
    } else {
      res.status(400).send(`User with ${email} doesn't exist`);
    }
  }),
};
