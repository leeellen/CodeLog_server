const { Users } = require('../../models');
const handlePromise = require('../helper');
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
    findByCompany: (companyid) => handlePromise(Users.findAll({
        where: {
            companyid,
        },
    })),
    updateByEmail: (email, username, password, companyid, position, completion, website) => handlePromise(Users.update({
        username,
        password,
        companyid,
        position,
        completion,
        website,
    }, {
        where: {
            email,
        },
    })),
};
