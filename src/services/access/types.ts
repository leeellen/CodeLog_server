const { Types } = require('../../database/models');
const handlePromise = require('../helper');

module.exports = {
  findByName: (name: string) =>
    handlePromise(
      Types.findOne({
        where: {
          name,
        },
      }),
    ),
  findById: (id: number) =>
    handlePromise(
      Types.findOne({
        where: {
          id,
        },
      }),
    ),
};
