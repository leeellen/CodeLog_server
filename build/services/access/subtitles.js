"use strict";
const { Subtitles } = require('../../database/models');
const handlePromise = require('../helper');
module.exports = {
    findByTypeid: (type_id) => handlePromise(Subtitles.findAll({
        where: {
            type_id,
        },
    })),
    getAllSubts: () => { },
};
