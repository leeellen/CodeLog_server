'use strict';
module.exports = (sequelize, DataTypes) => {
    const Contents = sequelize.define('Contents', {
        postid: DataTypes.INTEGER,
        subtitleid: DataTypes.INTEGER,
        body: DataTypes.TEXT
    }, {});
    Contents.associate = function (models) {
        // associations can be defined here
    };
    return Contents;
};
