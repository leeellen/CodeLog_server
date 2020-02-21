const { Postings, postings_tags, Contents, Subtitles } = require('../../database/models');
const handlePromise = require('../helper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
Postings.hasMany(Contents, { foreignKey: 'post_id' });
Contents.belongsTo(Postings, { foreignKey: 'post_id' });
Subtitles.hasMany(Contents, { foreignKey: 'subtitle_id' });
Contents.belongsTo(Subtitles, { foreignKey: 'subtitle_id' });
module.exports = {
    create: (postingData) => handlePromise(Postings.create(postingData)),
    findById: (post_id) => handlePromise(Postings.findOne({
        where: {
            id: post_id,
        },
    })),
    findByUserTheme: (user_id, type_id) => handlePromise(Postings.findAll({
        where: {
            user_id,
            type_id,
        },
        order: Sequelize.literal('id DESC'),
        attributes: { exclude: ['type_id', 'user_id'] },
        include: {
            model: Contents,
            attributes: ['body', 'subtitle_id'],
            include: {
                model: Subtitles,
                attributes: ['name'],
            },
        },
    })),
    findByNew: (num) => handlePromise(Postings.findAll({
        limit: num,
        order: Sequelize.literal('id DESC'),
        attributes: { exclude: ['type_id', 'user_id'] },
        include: {
            model: Contents,
            attributes: ['body', 'subtitle_id'],
            include: {
                model: Subtitles,
                attributes: ['name'],
            },
        },
    })),
    findByManyLike: (num) => handlePromise(Postings.findAll({
        limit: num,
        order: Sequelize.literal('likes DESC'),
        include: {
            model: Contents,
            attributes: ['body', 'subtitle_id'],
            include: {
                model: Subtitles,
                attributes: ['name'],
            },
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
