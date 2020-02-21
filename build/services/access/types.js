"use strict";
const { Types } = require('../../database/models');
const handlePromise = require('../helper');
module.exports = {
    findByName: (name) => handlePromise(Types.findOne({
        where: {
            name,
        },
    })),
    findById: (id) => handlePromise(Types.findOne({
        where: {
            id,
        },
    })),
    findAll: () => handlePromise(Types.findAll()),
};
