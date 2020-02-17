const asyncHandler = require('express-async-handler');

const { users } = require('../../services');

module.exports = {
  post: asyncHandler(async (req, res) => {
    const { email, username, password, companyid, position, completion, website } = req.body;

    let result = await users.create(
      email,
      username,
      password,
      companyid,
      position,
      completion,
      website,
    );
    if (!result.success) {
      if (result.message === 'duplicated') {
        res.status(409).send('User already exists');
      } else {
        console.log(result.message);
        res.sendStatus(500);
      }
    }

    res.status(200).send('User successfully created!');
  }),
};
