'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subtitle = sequelize.define(
    'Subtitle',
    {
      typeid: DataTypes.NUMBER,
      name: DataTypes.STRING,
    },
    {},
  );
  Subtitle.associate = function(models) {
    // associations can be defined here
  };
  return Subtitle;
};
