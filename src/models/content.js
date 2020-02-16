'use strict';
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    'Content',
    {
      postid: DataTypes.NUMBER,
      subtitieid: DataTypes.NUMBER,
      body: DataTypes.TEXT,
    },
    {},
  );
  Content.associate = function(models) {
    // associations can be defined here
  };
  return Content;
};
