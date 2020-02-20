const { Contents } = require('../../database/models');
const handlePromise = require('../helper');

module.exports = {
  create: (post_id: Number, subtitleid: Number, body: string) =>
    handlePromise(
      Contents.create({
        post_id,
        subtitleid,
        body,
      }),
    ),
  findByPostId: (post_id: Number) =>
    handlePromise(
      Contents.findAll({
        where: {
          post_id,
        },
      }),
    ),
  deleteByPostId: (post_id: Number) =>
    handlePromise(
      Contents.destroy({
        where: {
          post_id,
        },
      }),
    ),
};
