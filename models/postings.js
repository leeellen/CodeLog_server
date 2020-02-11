'use strict';
module.exports = (sequelize, DataTypes) => {
  const postings = sequelize.define(
    'postings',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      theme: DataTypes.STRING,
      userid: DataTypes.INTEGER,
    },
    {},
  );
  postings.associate = function(models) {
    // associations can be defined here
  };
  return postings;
};
