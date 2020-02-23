const { Subtitles } = require('../../database/models');
const { handlePromise } = require('../helper');

module.exports = {
  findByTypeid: (type_id: string) =>
    handlePromise(
      Subtitles.findAll({
        where: {
          type_id,
        },
      }),
    ),
  getAllSubts: () => {},
};
