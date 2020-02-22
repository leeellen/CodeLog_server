'use strict';
module.exports = (sequelize, DataTypes) => {
    const companies_tags = sequelize.define('companies_tags', {
        company_id: DataTypes.NUMBER,
        tag_id: DataTypes.NUMBER
    }, {});
    companies_tags.associate = function (models) {
        // associations can be defined here
    };
    return companies_tags;
};
