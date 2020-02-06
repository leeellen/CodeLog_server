const { users } = require('../../services');

module.exports = {
  post: async (req, res) => {
    const { body } = req;

    users
      .create(body.username, body.password, body.companyid, body.rank, body.completion)
      .then((result) => {
        if (result.success && result.message === 'created') {
          res.status(200).send('User successfully created!');
        } else if (result.message === 'duplicated') {
          res.status(409).send('User already exists');
        } else {
          res.sendStatus(500);
        }
      });
  },
};
