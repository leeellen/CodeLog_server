'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_code: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      partner: {
        type: Sequelize.BOOLEAN,
      },
      business_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_homepage: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Companies');
  },
};
