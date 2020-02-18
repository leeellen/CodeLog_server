const { Tags, postings_tags } = require('../../models');

module.exports = {
  getAllTags: function() {
    return Tags.findAll()
      .then((result) => {
        return {
          success: true,
          payload: result.map((el) => el.dataValues.name),
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
  findByName: function(tagname) {
    return Tags.findOne({
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
  findCountByPostId: function(postid) {
    return postings_tags
      .findAll({
        where: {
          postid,
        },
      })
      .then((result) => {
        return {
          success: true,
          payload: result.map((el) => el.dataValues.tagid),
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
  findNamesByPostId: function(postid) {
    return postings_tags
      .findAll({
        where: {
          postid,
        },
      })
      .then((result) => {
        return result.map((el) => {
          return Tags.findOne({
            where: {
              id: el.dataValues.tagid,
            },
          }).then((result) => {
            console.log(result.dataValues);
            return result.dataValues.name;
          });
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
