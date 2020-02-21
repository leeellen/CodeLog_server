import { CompanyRecord } from '../../interfaces';

const { Companies } = require('../../database/models');
const handlePromise = require('../helper');

module.exports = {
  create: (companyData: CompanyRecord) => handlePromise(Companies.create(companyData)),
  find: (company_id: number) =>
    handlePromise(
      Companies.findOne({
        where: {
          id: company_id,
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
