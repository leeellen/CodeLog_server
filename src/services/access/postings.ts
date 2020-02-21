const { Postings, postings_tags } = require('../../database/models');
const handlePromise = require('../helper');
const Sequelize = require('sequelize');
import { PostingRecord } from '../../interfaces';

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
  findByUser: (user_id: number) =>
    handlePromise(
      Postings.findAll({
        where: {
          user_id,
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
