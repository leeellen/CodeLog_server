'use strict';
module.exports = (sequelize, DataTypes) => {
    const Postings = sequelize.define('Postings', {
        title: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        typeid: DataTypes.INTEGER,
        theme: DataTypes.STRING,
        userid: DataTypes.INTEGER
    }, {});
    Postings.associate = function (models) {
        // associations can be defined here
    };
    return Postings;
};
