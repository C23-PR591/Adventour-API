'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gunungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      daerah: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      ketinggian: {
        type: Sequelize.INTEGER,
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      trek: {
        type: Sequelize.STRING,
      },
      jalur: {
        type: Sequelize.STRING,
      },
      simaksi: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Gunungs');
  },
};
