'use strict';
module.exports = (sequelize, DataTypes) => {
    const postings_tags = sequelize.define('postings_tags', {
        postid: DataTypes.INTEGER,
        tagid: DataTypes.INTEGER
    }, {});
    postings_tags.associate = function (models) {
        // associations can be defined here
    };
    return postings_tags;
};
