'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('companies_tags', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            company_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Companies',
                    key: 'id',
                },
            },
            tag_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Tags',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('companies_tags');
    },
};
