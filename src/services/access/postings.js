const { Postings, postings_tags } = require('../../models');
const handlePromise = require('../helper');
const Sequelize = require('sequelize');

module.exports = {
  create: (postingData) => handlePromise(Postings.create(postingData)),
  find: (postid) =>
    handlePromise(
      Postings.findOne({
        where: {
          id: postid,
        },
      }),
    ),
  findAll: (userid) =>
    handlePromise(
      Postings.findAll({
        where: {
          userid,
        },
      }),
    ),
  findTheme: (userid, theme) =>
    handlePromise(
      Postings.findAll({
        where: {
          userid,
          theme,
        },
      }),
    ),
  update: (postid, title, content) =>
    handlePromise(
      Postings.update(
        {
          title,
          content,
        },
        {
          where: {
            id: postid,
          },
        },
      ),
    ),
  increaseLike: (postid) =>
    handlePromise(
      Postings.update(
        {
          likes: Sequelize.literal('likes + 1'),
        },
        {
          where: {
            id: postid,
          },
        },
      ),
    ),
  getTags: function(postid) {
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
  addTags: function(postid, tagids) {
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
  deleteTags: function(postid, tagids) {
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
  delete: function(postid) {
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
