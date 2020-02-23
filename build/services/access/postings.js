const { Postings, postings_tags, Tags, Contents, Subtitles, Types, } = require('../../database/models');
const { handlePromise } = require('../helper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
Postings.hasMany(Contents, { foreignKey: 'post_id' });
Contents.belongsTo(Postings, { foreignKey: 'post_id' });
Types.hasMany(Postings, { foreignKey: 'type_id' });
Postings.belongsTo(Types, { foreignKey: 'type_id' });
Subtitles.hasMany(Contents, { foreignKey: 'subtitle_id' });
Contents.belongsTo(Subtitles, { foreignKey: 'subtitle_id' });
Postings.hasMany(postings_tags, { foreignKey: 'post_id' });
postings_tags.belongsTo(Postings, { foreignKey: 'post_id' });
Tags.hasMany(postings_tags, { foreignKey: 'tag_id' });
postings_tags.belongsTo(Tags, { foreignKey: 'tag_id' });
module.exports = {
    create: (postingData) => handlePromise(Postings.create(postingData)),
    findById: (post_id) => handlePromise(Postings.findOne({
        where: {
            id: post_id,
        },
        order: [[postings_tags, 'tag_id', 'ASC']],
        attributes: { exclude: ['type_id'] },
        include: [
            {
                model: Types,
                attributes: ['name'],
            },
            {
                model: Contents,
                attributes: ['body', 'subtitle_id'],
                include: {
                    model: Subtitles,
                    attributes: ['name'],
                },
            },
            {
                model: postings_tags,
                attributes: ['tag_id'],
                include: {
                    model: Tags,
                    where: {
                        type: 'stack',
                    },
                    attributes: ['name'],
                },
            },
        ],
    })),
    findByUser: (user_id) => handlePromise(Postings.findAll({
        where: {
            user_id,
        },
        order: [
            ['id', 'DESC'],
            [postings_tags, 'tag_id', 'ASC'],
        ],
        attributes: { exclude: ['type_id', 'user_id'] },
        include: [
            {
                model: Types,
                attributes: ['name'],
            },
            {
                model: Contents,
                attributes: ['body', 'subtitle_id'],
                include: {
                    model: Subtitles,
                    attributes: ['name'],
                },
            },
            {
                model: postings_tags,
                attributes: ['tag_id'],
                include: {
                    model: Tags,
                    where: {
                        type: 'stack',
                    },
                    attributes: ['name'],
                },
            },
        ],
    })),
    findByUserTheme: (user_id, type_id) => handlePromise(Postings.findAll({
        where: {
            user_id,
            type_id,
        },
        order: [
            ['id', 'DESC'],
            [postings_tags, 'tag_id', 'ASC'],
        ],
        attributes: { exclude: ['type_id', 'user_id'] },
        include: [
            {
                model: Types,
                attributes: ['name'],
            },
            {
                model: Contents,
                attributes: ['body', 'subtitle_id'],
                include: {
                    model: Subtitles,
                    attributes: ['name'],
                },
            },
            {
                model: postings_tags,
                attributes: ['tag_id'],
                include: {
                    model: Tags,
                    where: {
                        type: 'stack',
                    },
                    attributes: ['name'],
                },
            },
        ],
    })),
    findByNew: (num) => handlePromise(Postings.findAll({
        limit: num,
        order: [
            ['id', 'DESC'],
            [postings_tags, 'tag_id', 'ASC'],
        ],
        attributes: { exclude: ['type_id', 'user_id'] },
        include: [
            {
                model: Types,
                attributes: ['name'],
            },
            {
                model: Contents,
                attributes: ['body', 'subtitle_id'],
                include: {
                    model: Subtitles,
                    attributes: ['name'],
                },
            },
            {
                model: postings_tags,
                attributes: ['tag_id'],
                include: {
                    model: Tags,
                    where: {
                        type: 'stack',
                    },
                    attributes: ['name'],
                },
            },
        ],
    })),
    findByManyLike: (num) => handlePromise(Postings.findAll({
        limit: num,
        order: Sequelize.literal('likes DESC'),
        include: [
            {
                model: Types,
                attributes: ['name'],
            },
            {
                model: Contents,
                attributes: ['body', 'subtitle_id'],
                include: {
                    model: Subtitles,
                    attributes: ['name'],
                },
            },
            {
                model: postings_tags,
                attributes: ['tag_id'],
                include: {
                    model: Tags,
                    where: {
                        type: 'stack',
                    },
                    attributes: ['name'],
                },
            },
        ],
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
};
