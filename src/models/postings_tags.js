'use strict';
module.exports = (sequelize, DataTypes) => {
  const postings_tags = sequelize.define(
    'postings_tags',
    {
      postid: DataTypes.NUMBER,
      tagid: DataTypes.NUMBER,
    },
    {},
  );
  postings_tags.associate = function(models) {
    // associations can be defined here
  };
  return postings_tags;
};
