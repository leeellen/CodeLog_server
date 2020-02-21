import { ContentRecord } from '../../interfaces';

const { Contents } = require('../../database/models');
const handlePromise = require('../helper');

module.exports = {
  create: (post_id: number, subtitle_id: number, body: string) =>
    handlePromise(
      Contents.create({
        post_id,
        subtitle_id,
        body,
      }),
    ),

  findByPostId: (post_id: number) =>
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
  deleteByPostId: (post_id: number) =>
    handlePromise(
      Contents.destroy({
        where: {
          post_id,
        },
      }),
    ),
};
