'use strict';
module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define(
    'Companies',
    {
      company_code: DataTypes.STRING,
      company_name: DataTypes.STRING,
      info: DataTypes.TEXT,
      partner: DataTypes.BOOLEAN,
      business_name: DataTypes.STRING,
      eid: DataTypes.STRING,
      company_homepage: DataTypes.STRING,
    },
    {},
  );
  Companies.associate = function(models) {
    // associations can be defined here
  };
  return Companies;
};
