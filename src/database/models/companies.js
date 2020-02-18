'use strict';
module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define(
    'Companies',
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
  Companies.associate = function(models) {
    // associations can be defined here
  };
  return Companies;
};
