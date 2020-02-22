import { CompanyRecord } from '../../interfaces';

const { Companies, Users } = require('../../database/models');
const handlePromise = require('../helper');

Companies.hasMany(Users, { foreignKey: 'company_id' });
Users.belongsTo(Companies, { foreignKey: 'company_id' });

module.exports = {
  create: (companyData: CompanyRecord) => handlePromise(Companies.create(companyData)),
  find: (company_id: number) =>
    handlePromise(
      Companies.findOne({
        where: {
          id: company_id,
        },
        include: {
          model: Users,
          attributes: ['email', 'username', 'password', 'position'],
        },
      }),
    ),
  findByNew: (num: number) =>
    handlePromise(
      Companies.findAll({
        limit: num,
        order: [['id', 'DESC']],
        attributes: ['company_name', 'info', 'partner', 'company_homepage'],
      }),
    ),
  update: (companyData: CompanyRecord) =>
    handlePromise(
      Companies.update(companyData, {
        where: {
          company_code: companyData.company_code,
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
