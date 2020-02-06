const { users } = require('../../models');

module.exports = (username, password, companyid, rank, completion) => {
  return users
    .findOrCreate({
      where: {
        username,
      },
      defaults: {
        password,
        companyid,
        rank,
        completion,
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
