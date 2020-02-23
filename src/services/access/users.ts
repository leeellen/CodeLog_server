const { Users } = require('../../database/models');
const { handlePromise } = require('../helper');
import { UserRecord } from '../../interfaces';

module.exports = {
  create: (userData: UserRecord) =>
    handlePromise(
      Users.findOrCreate({
        where: {
          email: userData.email,
        },
        defaults: userData,
      }).spread((result: any, created: any) => {
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
  findByCompany: (company_id: number) =>
    handlePromise(
      Users.findAll({
        where: {
          company_id,
        },
      }),
    ),
  findById: (id: number) =>
    handlePromise(
      Users.findOne({
        where: {
          id,
        },
      }),
    ),
  updateByEmail: (userData: UserRecord) =>
    handlePromise(
      Users.update(userData, {
        where: {
          email: userData.email,
        },
      }),
    ),
  updateById: (userData: UserRecord) =>
    handlePromise(
      Users.update(userData, {
        where: {
          id: userData.id,
        },
      }),
    ),
  delete: (user_id: number) =>
    handlePromise(
      Users.destroy({
        where: {
          id: user_id,
        },
      }),
    ),
};
