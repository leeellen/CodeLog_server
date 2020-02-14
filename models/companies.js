'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define(
    'companies',
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      info: DataTypes.TEXT,
      ispartner: DataTypes.BOOLEAN,
      bname: DataTypes.STRING,
      eid: DataTypes.STRING,
      homepage: DataTypes.STRING,
    },
    {},
  );
  companies.associate = function(models) {
    // associations can be defined here
  };
  return companies;
};
