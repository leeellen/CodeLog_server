'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contents = sequelize.define(
    'Contents',
    {
      post_id: DataTypes.INTEGER,
      subtitle_id: DataTypes.INTEGER,
      body: DataTypes.TEXT,
    },
    {},
  );
  Contents.associate = function(models) {
    // associations can be defined here
  };
  return Contents;
};
