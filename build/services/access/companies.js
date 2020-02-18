"use strict";
const { Companies } = require('../../models');
const handlePromise = require('../helper');
const Sequelize = require('sequelize');
module.exports = {
    create: (code, name, info, ispartner, bname, eid, homepage) => handlePromise(Companies.create({
        code,
        name,
        info,
        ispartner,
        bname,
        eid,
        homepage,
    })),
    find: (companyid) => handlePromise(Companies.findOne({
        where: {
            id: companyid,
        },
    })),
    changeUser: function (companyid, userid) { },
    deleteUser: function (companyid, userid) { },
};
