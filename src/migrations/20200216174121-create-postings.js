'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Postings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      likes: {
        type: Sequelize.NUMBER,
        defaultValue: 0,
      },
      typeid: {
        type: Sequelize.NUMBER,
        references: {
          model: 'Types',
          key: 'id',
        },
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userid: {
        type: Sequelize.NUMBER,
        references: {
          model: 'Users',
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
    return queryInterface.dropTable('Postings');
  },
};
