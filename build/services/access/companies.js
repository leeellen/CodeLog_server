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
    delete: (company_id) => handlePromise(Companies.destroy({
        where: {
            id: company_id,
        },
    })),
};
