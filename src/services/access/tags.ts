import { PTRecord } from '../../interfaces';

const { Tags, postings_tags } = require('../../database/models');
const handlePromise = require('../helper');

module.exports = {
  getAllTags: () => handlePromise(Tags.findAll()),
  findByName: (tagname: string) =>
    handlePromise(
      Tags.findOne({
        where: {
          name: tagname,
        },
      }),
    ),
  deleteByPostId: (post_id: number) =>
    handlePromise(
      postings_tags.destroy({
        where: {
          post_id,
        },
      }),
    ),

  addAllTags: (tagDatas: Array<PTRecord>) => handlePromise(postings_tags.bulkCreate(tagDatas)),
};
