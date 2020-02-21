"use strict";
const { Companies } = require('../../database/models');
const handlePromise = require('../helper');
module.exports = {
    create: (code, name, info, partner, business_name, eid, company_homepage) => handlePromise(Companies.create({
        code,
        name,
        info,
        partner,
        business_name,
        eid,
        company_homepage,
    })),
    find: (company_id) => handlePromise(Companies.findOne({
        where: {
            id: company_id,
        },
    })),
    changeUser: function (companyid, userid) { },
    deleteUser: function (companyid, userid) { },
};
