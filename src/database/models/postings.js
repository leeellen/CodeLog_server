'use strict';
module.exports = (sequelize, DataTypes) => {
  const Postings = sequelize.define(
    'Postings',
    {
      title: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {},
  );
  Postings.associate = function(models) {
    // associations can be defined here
  };
  return Postings;
};
