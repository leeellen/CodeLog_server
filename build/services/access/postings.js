const { Postings, postings_tags } = require('../../database/models');
const handlePromise = require('../helper');
const Sequelize = require('sequelize');
module.exports = {
    create: (postingData) => handlePromise(Postings.create(postingData)),
    findById: (post_id) => handlePromise(Postings.findOne({
        where: {
            id: post_id,
        },
    })),
    findByUser: (user_id) => handlePromise(Postings.findAll({
        where: {
            user_id,
        },
    })),
    findByUserTheme: (user_id, type_id) => handlePromise(Postings.findAll({
        where: {
            user_id,
            type_id,
        },
    })),
    updateTitleById: (id, title) => handlePromise(Postings.update({
        title,
    }, {
        where: {
            id,
        },
    })),
    delete: (post_id) => handlePromise(Postings.destroy({
        where: {
            id: post_id,
        },
    })),
    increaseLike: (post_id) => handlePromise(Postings.update({
        likes: Sequelize.literal('likes + 1'),
    }, {
        where: {
            id: post_id,
        },
    })),
    decreaseLike: (post_id) => handlePromise(Postings.update({
        likes: Sequelize.literal('likes - 1'),
    }, {
        where: {
            id: post_id,
        },
    })),
    getTags: (post_id) => handlePromise(postings_tags.findAll({
        where: {
            post_id,
        },
    })),
    addTags: (post_id, tagids) => handlePromise(postings_tags.bulkCreate(tagids)),
    deleteTags: (post_id, tagids) => handlePromise(postings_tags.bulkDelete(tagids)),
};
