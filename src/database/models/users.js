'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      position: DataTypes.STRING,
      certificate: DataTypes.STRING,
      personal_homepage: DataTypes.STRING,
    },
    {},
  );
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
