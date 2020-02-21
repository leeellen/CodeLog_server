const { Companies } = require('../../database/models');
const handlePromise = require('../helper');
module.exports = {
    create: (companyData) => handlePromise(Companies.create(companyData)),
    find: (company_id) => handlePromise(Companies.findOne({
        where: {
            id: company_id,
        },
    })),
    delete: (company_id) => handlePromise(Companies.destroy({
        where: {
            id: company_id,
        },
    })),
};
