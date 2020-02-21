import { ContentRecord } from '../../interfaces';

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
  update: (updateDatas: Array<ContentRecord>) =>
    handlePromise(
      Contents.bulkCreate(updateDatas, {
        updateOnDuplicate: ['id'],
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
