const { Contents } = require('../../database/models');
const handlePromise = require('../helper');
module.exports = {
    create: (post_id, subtitleid, body) => handlePromise(Contents.create({
        post_id,
        subtitleid,
        body,
    })),
    findByPostId: (post_id) => handlePromise(Contents.findAll({
        where: {
            post_id,
        },
    })),
    update: (updateDatas) => handlePromise(Contents.bulkCreate(updateDatas, {
        updateOnDuplicate: ['id'],
    })),
    deleteByPostId: (post_id) => handlePromise(Contents.destroy({
        where: {
            post_id,
        },
    })),
};
