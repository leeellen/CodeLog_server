const { Users } = require('../../models');
const { handlePromise } = require('../helper');

export default {
  create: (email, username, password, companyid, position, completion, website) =>
    handlePromise(
      Users.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          username,
          password,
          companyid,
          position,
          completion,
          website,
        },
      }).spread((result, created) => {
        return created ? 'created' : 'duplicated';
      }),
    ),
  findByEmail: (email) =>
    handlePromise(
      Users.findOne({
        where: {
          email,
        },
      }),
    ),
  findByUsername: (username) =>
    handlePromise(
      Users.findOne({
        where: {
          username,
        },
      }),
    ),
  findByCompany: (companyid) =>
    handlePromise(
      Users.findAll({
        where: {
          companyid,
        },
      }),
    ),
  updateByEmail: (email, username, password, companyid, position, completion, website) =>
    handlePromise(
      Users.update(
        {
          username,
          password,
          companyid,
          position,
          completion,
          website,
        },
        {
          where: {
            email,
          },
        },
      ),
    ),
};
