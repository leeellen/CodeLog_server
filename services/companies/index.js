const { companies, users } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  create: function(code, name, info, ispartner, bname, eid, homepage) {
    return companies
      .create({
        code,
        name,
        info,
        ispartner,
        bname,
        eid,
        homepage,
      })
      .then((result) => {
        return {
          success: true,
          payload: result.dataValues,
          message: 'created',
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          success: false,
          payload: JSON.stringify(error),
          message: 'duplicated',
        };
      });
  },
  find: function(companyid) {
    return companies
      .findOne({
        where: {
          id: companyid,
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
          payload: JSON.stringify(error),
          message: 'not exists',
        };
      });
  },
  changeUser: function(companyid, userid) {},
  deleteUser: function(companyid, userid) {},
};
