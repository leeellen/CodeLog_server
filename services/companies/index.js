const { companies, users } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
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
          payload: error.toString(),
          message: 'not exists',
        };
      });
  },
  changeUser: function(companyid, userid) {},
  deleteUser: function(companyid, userid) {},
};
