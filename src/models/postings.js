'use strict';
module.exports = (sequelize, DataTypes) => {
  const Postings = sequelize.define(
    'Postings',
    {
      likes: DataTypes.NUMBER,
      typeid: DataTypes.NUMBER,
      theme: DataTypes.STRING,
      userid: DataTypes.NUMBER,
    },
    {},
  );
  Postings.associate = function(models) {
    // associations can be defined here
  };
  return Postings;
};
