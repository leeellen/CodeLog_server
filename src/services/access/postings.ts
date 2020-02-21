const { Postings, postings_tags, Contents, Subtitles } = require('../../database/models');
const handlePromise = require('../helper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
import { PostingRecord } from '../../interfaces';

Postings.hasMany(Contents, { foreignKey: 'post_id' });
Contents.belongsTo(Postings, { foreignKey: 'post_id' });

Subtitles.hasMany(Contents, { foreignKey: 'subtitle_id' });
Contents.belongsTo(Subtitles, { foreignKey: 'subtitle_id' });

module.exports = {
  create: (postingData: PostingRecord) => handlePromise(Postings.create(postingData)),
  findById: (post_id: number) =>
    handlePromise(
      Postings.findOne({
        where: {
          id: post_id,
        },
      }),
    ),
  findByUserTheme: (user_id: number, type_id: number) =>
    handlePromise(
      Postings.findAll({
        where: {
          user_id,
          type_id,
        },
        order: Sequelize.literal('id DESC'),
        attributes: { exclude: ['type_id', 'user_id'] },
        include: {
          model: Contents,
          attributes: ['body', 'subtitle_id'],
          include: {
            model: Subtitles,
            attributes: ['name'],
          },
        },
      }),
    ),
  findByNew: (num: number) =>
    handlePromise(
      Postings.findAll({
        limit: num,
        order: Sequelize.literal('id DESC'),
        attributes: { exclude: ['type_id', 'user_id'] },
        include: {
          model: Contents,
          attributes: ['body', 'subtitle_id'],
          include: {
            model: Subtitles,
            attributes: ['name'],
          },
        },
      }),
    ),
  findByManyLike: (num: number) =>
    handlePromise(
      Postings.findAll({
        limit: num,
        order: Sequelize.literal('likes DESC'),
        include: {
          model: Contents,
          attributes: ['body', 'subtitle_id'],
          include: {
            model: Subtitles,
            attributes: ['name'],
          },
        },
      }),
    ),
  updateTitleById: (id: number, title: string) =>
    handlePromise(
      Postings.update(
        {
          title,
        },
        {
          where: {
            id,
          },
        },
      ),
    ),
  delete: (post_id: number) =>
    handlePromise(
      Postings.destroy({
        where: {
          id: post_id,
        },
      }),
    ),
  increaseLike: (post_id: number) =>
    handlePromise(
      Postings.update(
        {
          likes: Sequelize.literal('likes + 1'),
        },
        {
          where: {
            id: post_id,
          },
        },
      ),
    ),
  decreaseLike: (post_id: number) =>
    handlePromise(
      Postings.update(
        {
          likes: Sequelize.literal('likes - 1'),
        },
        {
          where: {
            id: post_id,
          },
        },
      ),
    ),
  getTags: (post_id: string) =>
    handlePromise(
      postings_tags.findAll({
        where: {
          post_id,
        },
      }),
    ),
  addTags: (post_id: number, tagids: any) => handlePromise(postings_tags.bulkCreate(tagids)),
  deleteTags: (post_id: number, tagids: any) => handlePromise(postings_tags.bulkDelete(tagids)),
};
