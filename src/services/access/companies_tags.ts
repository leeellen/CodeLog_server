import { CompanyRecord } from '../../interfaces';

const { companies_tags, Tags, postings_tags, Postings, Users } = require('../../database/models');
const { handlePromise } = require('../helper');

Tags.hasMany(companies_tags, { foreignKey: 'tag_id' });
companies_tags.belongsTo(Tags, { foreignKey: 'tag_id' });

Tags.hasMany(postings_tags, { foreignKey: 'tag_id' });
postings_tags.belongsTo(Tags, { foreignKey: 'tag_id' });

Postings.hasMany(postings_tags, { foreignKey: 'post_id' });
postings_tags.belongsTo(Postings, { foreignKey: 'post_id' });

Users.hasMany(Postings, { foreignKey: 'user_id' });
Postings.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = {
  findDeveloper: (company_id: number) =>
    handlePromise(
      companies_tags.findAll({
        where: {
          company_id,
        },
        attributes: ['tag_id'],
        order: [
          ['tag_id', 'ASC'],
          [Tags, postings_tags, Postings, 'user_id', 'ASC'],
        ],
        include: {
          model: Tags,
          attributes: ['name'],
          include: {
            model: postings_tags,
            attributes: ['post_id'],
            include: {
              model: Postings,
              attributes: ['user_id'],
            },
          },
        },
      }),
    ),
};
