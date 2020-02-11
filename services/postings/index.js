const { postings, postings_tags } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  create: function(userid, title, content, likes, theme) {
    return postings
      .create({
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
    return postings
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
    return postings
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
};
