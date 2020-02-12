const { tags, postings_tags } = require('../../models');

module.exports = {
  findByName: function(tagname) {
    return tags
      .findOne({
        where: {
          name: tagname,
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
  findByPostId: function(postid) {
    return postings_tags
      .findAll({
        where: {
          postid,
        },
      })
      .then((result) => {
        return result.map((el) => {
          tags
            .findOne({
              id: el.dataValues.tagid,
            })
            .then((result) => result.dataValues.tagname);
        });
      })
      .then((result) => {
        return Promise.all(result).then((resultArr) => {
          return {
            success: true,
            payload: resultArr,
            message: 'all tags',
          };
        });
      })
      .catch((error) => {
        return {
          success: false,
          payload: error.toString(),
          message: 'not all tags',
        };
      });
  },
};
