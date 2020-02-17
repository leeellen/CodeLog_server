"use strict";
const { Postings, postings_tags } = require('../../models');
const Sequelize = require('sequelize');
module.exports = {
    create: function (userid, title, content, likes, theme) {
        return Postings.create({
            title,
            content,
            likes,
            theme,
            userid,
        })
            .then((result) => {
            console.log(result.dataValues);
            return {
                success: true,
                payload: result.dataValues,
                message: 'created',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not created',
            };
        });
    },
    find: function (postid) {
        return Postings.findOne({
            where: {
                id: postid,
            },
        })
            .then((result) => {
            console.log(result.dataValues);
            return {
                success: true,
                payload: result.dataValues,
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    findAll: function (userid) {
        return Postings.findAll({
            where: {
                userid,
            },
        })
            .then((result) => {
            return {
                success: true,
                payload: result.map((el) => el.dataValues),
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    findPlain: function (userid) {
        return Postings.findAll({
            where: {
                userid,
                theme: 'plain',
            },
        })
            .then((result) => {
            return {
                success: true,
                payload: result.map((el) => el.dataValues),
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    findTIL: function (userid) {
        return Postings.findAll({
            where: {
                userid,
                theme: 'til',
            },
        })
            .then((result) => {
            return {
                success: true,
                payload: result.map((el) => el.dataValues),
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    findTech: function (userid) {
        return Postings.findAll({
            where: {
                userid,
                theme: 'tech',
            },
        })
            .then((result) => {
            return {
                success: true,
                payload: result.map((el) => el.dataValues),
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    findDev: function (userid) {
        return Postings.findAll({
            where: {
                userid,
                theme: 'dev',
            },
        })
            .then((result) => {
            return {
                success: true,
                payload: result.map((el) => el.dataValues),
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    update: function (postid, title, content) {
        return Postings.update({
            title,
            content,
        }, {
            where: {
                id: postid,
            },
        })
            .then((result) => {
            console.log(result);
            return {
                success: true,
                payload: result.dataValues,
                message: 'updated',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not updated',
            };
        });
    },
    increaseLike: function (postid) {
        return Postings.update({
            likes: Sequelize.literal('likes + 1'),
        }, {
            where: {
                id: postid,
            },
        })
            .then((result) => {
            console.log(result);
            return {
                success: true,
                payload: result.dataValues,
                message: 'updated',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not updated',
            };
        });
    },
    getTags: function (postid) {
        return postings_tags
            .findAll({
            where: {
                postid,
            },
        })
            .then((result) => {
            return {
                success: true,
                payload: result.map((el) => el.dataValues),
                message: 'exists',
            };
        })
            .catch((error) => {
            console.log(error);
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
    addTags: function (postid, tagids) {
        tagids = tagids.map((el) => {
            return { tagid: el, postid };
        });
        return postings_tags
            .bulkCreate(tagids)
            .then(() => {
            return {
                success: true,
                payload: null,
                message: 'updated',
            };
        })
            .catch((error) => {
            console.log(error);
            return {
                success: false,
                payload: error.toString(),
                message: 'not updated',
            };
        });
    },
    deleteTags: function (postid, tagids) {
        tagids = tagids.map((el) => {
            return { tagid: el, postid };
        });
        return postings_tags
            .bulkDelete(tagids)
            .then((result) => {
            return {
                success: true,
                payload: null,
                message: 'deleted',
            };
        })
            .catch((error) => {
            console.log(error);
            return {
                success: false,
                payload: error.toString(),
                message: 'not updated',
            };
        });
    },
    delete: function (postid) {
        return Postings.destroy({
            where: {
                id: postid,
            },
        })
            .then((result) => {
            console.log(result.dataValues);
            return {
                success: true,
                payload: result.dataValues,
                message: 'exists',
            };
        })
            .catch((error) => {
            return {
                success: false,
                payload: error.toString(),
                message: 'not exists',
            };
        });
    },
};
