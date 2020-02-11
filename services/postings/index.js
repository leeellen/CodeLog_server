const { postings, postings_tags } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  create: function(userid, title, content, likes, theme) {
    console.log(email);
    return postings
      .create({
        title,
        content,
        likes,
        theme,
        userid,
      })
      .then((result) => {
        return {
          success: true,
          payload: null,
          message: result.dataValues.id,
        };
      })
      .catch((error) => {
        return {
          success: false,
          payload: null,
          message: error.toString(),
        };
      });
  },
  find: function(postid) {
    return postings
      .findOne({
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
  update: function(postid, title, content) {
    postings
      .update(
        {
          title,
          content,
        },
        {
          where: {
            postid,
          },
        },
      )
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
  increaseLike: function(postid) {
    postings
      .update(
        {
          likes: Sequelize.literal('likes + 1'),
        },
        {
          where: {
            id: postid,
          },
        },
      )
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
  addTags: function(postid, tagids) {
    tagids = tagids.map((el) => {
      return { tagid: el, postid };
    });
    postings_tags
      .bulkCreate(tagids)
      .then(() => {
        return {
          success: true,
          payload: null,
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
};
