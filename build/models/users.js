'use strict';
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        companyid: DataTypes.INTEGER,
        position: DataTypes.STRING,
        completion: DataTypes.STRING,
        website: DataTypes.STRING,
    }, {});
    Users.associate = function (models) {
        // associations can be defined here
    };
    return Users;
};
