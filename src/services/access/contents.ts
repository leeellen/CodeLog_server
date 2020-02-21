import { ContentRecord } from '../../interfaces';

const { Contents, Subtitles } = require('../../database/models');
const handlePromise = require('../helper');

Subtitles.hasMany(Contents, { foreignKey: 'subtitle_id' });
Contents.belongsTo(Subtitles, { foreignKey: 'subtitle_id' });

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
        include: {
          model: Subtitles,
          attributes: ['name'],
        },
      }),
    ),
  update: (updateData: ContentRecord) =>
    handlePromise(
      Contents.update(updateData, {
        where: {
          id: updateData.id,
        },
      }),
    ),
  updateMany: (updateDatas: Array<ContentRecord>) =>
    handlePromise(
      Contents.bulkCreate(updateDatas, {
        updateOnDuplicate: ['post_id', 'subtitle_id'],
        fields: ['id', 'post_id', 'subtitle_id', 'body'],
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
