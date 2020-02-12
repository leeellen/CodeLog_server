const asyncHandler = require('express-async-handler');

const { users } = require('../../services');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { email } = req.body;

    const re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!re.test(String(email).toLowerCase())) {
      res.status(200).send('It is not email');
    }

    let userData = await users.find(email, null);
    if (userData.success) {
      res.status(200).send(`This email has already joined`);
      return;
    }

    res.status(200).send(`This email is usable!`);
  }),
};
