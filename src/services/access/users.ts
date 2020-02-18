const { Users } = require('../../models');
const handlePromise = require('../helper');
import { UserRecord } from '../../interfaces';

module.exports = {
  create: (userData: UserRecord) =>
    handlePromise(
      Users.findOrCreate({
        where: {
          email: userData.email,
        },
        defaults: userData,
      }).spread((result, created) => {
        return created ? 'created' : 'duplicated';
      }),
    ),
  findByEmail: (email: string) =>
    handlePromise(
      Users.findOne({
        where: {
          email,
        },
      }),
    ),
  findByUsername: (username: string) =>
    handlePromise(
      Users.findOne({
        where: {
          username,
        },
      }),
    ),
  findByCompany: (companyid: number) =>
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
