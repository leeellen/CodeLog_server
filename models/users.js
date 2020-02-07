'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      companyid: DataTypes.NUMBER,
      rank: DataTypes.STRING,
      website: DataTypes.STRING,
      completion: DataTypes.STRING,
    },
    {},
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
