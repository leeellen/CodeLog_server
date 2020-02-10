'use strict';
module.exports = (sequelize, DataTypes) => {
  const postings = sequelize.define('postings', {
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
  postings.associate = function(models) {
    // associations can be defined here
  };
  return postings;
};