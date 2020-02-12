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
        },
      })
      .then((result) => {
        console.log(result.dataValues);
        if (password !== result.dataValues.password) {
          return {
            success: true,
            payload: null,
            message: 'wrong password',
          };
        }
        return {
          success: true,
          payload: result.dataValues,
          message: 'exists',
        };
      })
      .catch((error) => {
        return {
          success: false,
          payload: error.toString(),
          message: 'not exists',
        };
      });
  },
  findById: function(userid) {
    return users
      .findOne({
        where: {
          id: userid,
        },
      })
      .then((result) => {
        console.log(result.dataValues);
        return {
          success: true,
          payload: result.dataValues,
          message: 'exists',
        };
      })
      .catch((error) => {
        return {
          success: false,
          payload: error.toString(),
          message: 'not exists',
        };
      });
  },
  findByCompany: function(companyid) {
    return users
      .findAll({
        where: {
          companyid,
        },
      })
      .then((result) => {
        return {
          success: true,
          payload: result.map((el) => el.dataValues),
          message: 'exists',
        };
      })
      .catch((error) => {
        return {
          success: false,
          payload: JSON.stringify(error),
          message: 'not exists',
        };
      });
  },
  updateByEmail: function(email, username, password, companyid, rank, completion, website) {
    return users
      .update(
        {
          username,
          password,
          companyid,
          rank,
          completion,
          website,
        },
        {
          where: {
            email,
          },
        },
      )
      .then((result) => {
        console.log(result);
        if (result) {
          return {
            success: true,
            payload: result.dataValues,
            message: 'updated',
          };
        } else {
          return {
            success: false,
            payload: result.dataValues,
            message: 'not updated',
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
