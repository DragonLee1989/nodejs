"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("allcodes", {
      // allcodes: SQL thuong ki hieu co dau 's' khi alone 1 minh, khong co dau 's' khi co quan he
      //   key: DataTypes.STRING,
      //   type: DataTypes.STRING,
      //   value_en: DataTypes.STRING,
      //   value_vn: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      valueEn: {
        type: Sequelize.STRING,
      },
      valueVn: {
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
    await queryInterface.dropTable("allcodes");
  },
};

// npx sequelize-cli db:migrate => Running Migrations
// npx sequelize-cli db:migrate:undo => Undoing Migrations
