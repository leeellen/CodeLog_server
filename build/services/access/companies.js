const { Companies, Users } = require('../../database/models');
const handlePromise = require('../helper');
Companies.hasMany(Users, { foreignKey: 'company_id' });
Users.belongsTo(Companies, { foreignKey: 'company_id' });
module.exports = {
    create: (companyData) => handlePromise(Companies.create(companyData)),
    find: (company_id) => handlePromise(Companies.findOne({
        where: {
            id: company_id,
        },
        include: {
            model: Users,
            attributes: ['email', 'username', 'password', 'position'],
        },
    })),
    findByNew: (num) => handlePromise(Companies.findAll({
        limit: num,
        order: [['id', 'DESC']],
        attributes: ['company_name', 'info', 'partner', 'company_homepage'],
    })),
    update: (companyData) => handlePromise(Companies.update(companyData, {
        where: {
            company_code: companyData.company_code,
        },
    })),
    delete: (company_id) => handlePromise(Companies.destroy({
        where: {
            id: company_id,
        },
    })),
};
