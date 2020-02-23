const { Users } = require('../../database/models');
const { handlePromise } = require('../helper');
module.exports = {
    create: (userData) => handlePromise(Users.findOrCreate({
        where: {
            email: userData.email,
        },
        defaults: userData,
    }).spread((result, created) => {
        return created ? 'created' : 'duplicated';
    })),
    findByEmail: (email) => handlePromise(Users.findOne({
        where: {
            email,
        },
    })),
    findByUsername: (username) => handlePromise(Users.findOne({
        where: {
            username,
        },
    })),
    findByCompany: (company_id) => handlePromise(Users.findAll({
        where: {
            company_id,
        },
    })),
    findById: (id) => handlePromise(Users.findOne({
        where: {
            id,
        },
    })),
    updateByEmail: (userData) => handlePromise(Users.update(userData, {
        where: {
            email: userData.email,
        },
    })),
};
