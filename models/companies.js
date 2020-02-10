'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define('companies', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    ispartner: DataTypes.BOOLEAN,
    mutual: DataTypes.STRING,
    eid: DataTypes.STRING,
    homepage: DataTypes.STRING
  }, {});
  companies.associate = function(models) {
    // associations can be defined here
  };
  return companies;
};