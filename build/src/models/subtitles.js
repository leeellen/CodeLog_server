'use strict';
module.exports = (sequelize, DataTypes) => {
    const Subtitles = sequelize.define('Subtitles', {
        name: DataTypes.STRING,
        typeid: DataTypes.INTEGER
    }, {});
    Subtitles.associate = function (models) {
        // associations can be defined here
    };
    return Subtitles;
};
