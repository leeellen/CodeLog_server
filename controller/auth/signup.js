const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { body } = req;
    users
      .findOrCreate({
        where: {
          username: body.username,
        },
        defaults: {
          password: body.password,
          companyid: body.companyid,
          rank: body.rank,
          completion: body.completion,
        },
      })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('User already exists');
        }
        return res.status(200).send('User successfully created');
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500); // Server error
      });
  },
};
