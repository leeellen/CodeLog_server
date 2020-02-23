import { CompanyRecord } from '../../interfaces';

const { Companies, Users, companies_tags, Tags } = require('../../database/models');
const { handlePromise } = require('../helper');

Companies.hasMany(Users, { foreignKey: 'company_id' });
Users.belongsTo(Companies, { foreignKey: 'company_id' });

Companies.hasMany(companies_tags, { foreignKey: 'company_id' });
companies_tags.belongsTo(Companies, { foreignKey: 'company_id' });

Tags.hasMany(companies_tags, { foreignKey: 'tag_id' });
companies_tags.belongsTo(Tags, { foreignKey: 'tag_id' });

module.exports = {
  create: (companyData: CompanyRecord) => handlePromise(Companies.create(companyData)),
  find: (company_id: number) =>
    handlePromise(
      Companies.findOne({
        where: {
          id: company_id,
        },
        order: [[companies_tags, 'tag_id', 'ASC']],
        include: [
          {
            model: Users,
            attributes: ['id', 'email', 'username', 'password', 'position'],
          },
          {
            model: companies_tags,
            attributes: ['tag_id'],
            include: {
              model: Tags,
              attributes: ['name'],
            },
          },
        ],
      }),
    ),
  findByNew: (num: number) =>
    handlePromise(
      Companies.findAll({
        limit: num,
        order: [
          ['id', 'DESC'],
          [companies_tags, 'tag_id', 'ASC'],
        ],
        attributes: ['company_name', 'info', 'partner', 'company_homepage'],
        include: {
          model: companies_tags,
          attributes: ['tag_id'],
          include: {
            model: Tags,
            attributes: ['name'],
          },
        },
      }),
    ),
  update: (companyData: CompanyRecord) =>
    handlePromise(
      Companies.update(companyData, {
        where: {
          id: companyData.id,
        },
      }),
    ),
  delete: (company_id: number) =>
    handlePromise(
      Companies.destroy({
        where: {
          id: company_id,
        },
      }),
    ),
};
