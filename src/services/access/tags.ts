import { PTRecord, CTRecord } from '../../interfaces';

const { Tags, postings_tags, companies_tags } = require('../../database/models');
const { handlePromise } = require('../helper');

module.exports = {
  getPTTags: () =>
    handlePromise(
      Tags.findAll({
        where: {
          type: 'stack',
        },
      }),
    ),
  getCTTags: () =>
    handlePromise(
      Tags.findAll({
        where: {
          type: 'company',
        },
      }),
    ),
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
  deleteByCompanyId: (company_id: number) =>
    handlePromise(
      companies_tags.destroy({
        where: {
          company_id,
        },
      }),
    ),

  addPTTags: (tagDatas: Array<PTRecord>) => handlePromise(postings_tags.bulkCreate(tagDatas)),
  addCTTags: (tagDatas: Array<CTRecord>) => handlePromise(companies_tags.bulkCreate(tagDatas)),
};
