const { tags } = require('../../models');

module.exports = {
  find: function(tagname) {
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
};
