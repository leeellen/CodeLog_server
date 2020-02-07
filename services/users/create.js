const { users } = require('../../models');

module.exports = (email, username, password, companyid, rank, completion, website) => {
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
    .then(([result, created]) => {
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
};
