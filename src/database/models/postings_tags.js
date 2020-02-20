'use strict';
module.exports = (sequelize, DataTypes) => {
  const postings_tags = sequelize.define(
    'postings_tags',
    {
      post_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {},
  );
  postings_tags.associate = function(models) {
    // associations can be defined here
  };
  return postings_tags;
};
