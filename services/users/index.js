const { users } = require('../../models');

module.exports = {
  create: function(email, username, password, companyid, rank, completion, website) {
    console.log(email);
    return users
      .findOrCreate({
        where: {
          email,
        },
        defaults: {
          username,
          password,
          companyid,
          rank,
          completion,
          website,
        },
      })
      .spread((result, created) => {
        if (!created) {
          return {
            success: false,
            payload: null,
            message: 'duplicated',
          };
        }
        return {
          success: true,
          payload: null,
          message: 'created',
        };
      })
      .catch((error) => {
        return {
          success: false,
          payload: null,
          message: error.toString(),
        };
      });
  },
  find: function(email, password) {
    return users
      .findOne({
        where: {
          email,
          password,
        },
      })
      .then((result) => {
        if (result.dataValues) {
          return {
            success: true,
            payload: result.dataValues,
            message: 'exists',
          };
        } else {
          return {
            success: false,
            payload: null,
            message: 'not exists',
          };
        }
      })
      .catch((error) => {
        return {
          success: false,
          payload: null,
          message: error.toString(),
        };
      });
  },
};
