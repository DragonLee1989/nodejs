"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // ham "up" =>> ghi vao database binh thuong
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
     */
    //   email: DataTypes.STRING,
    //   password: DataTypes.STRING,
    //   firstName: DataTypes.STRING,
    //   lastName: DataTypes.STRING,
    //   address: DataTypes.STRING,
    //   gender: DataTypes.BOOLEAN,
    //   roleid: DataTypes.STRING,
    //   phoneNumber: DataTypes.STRING,
    //   positionId: DataTypes.STRING,
    //   image: DataTypes.STRING,

    // bulkInsert: insert vao DB
    return queryInterface.bulkInsert("Users", [
      {
        email: "longlee@gmail.com",
        password: "123456",
        firstName: "Long",
        lastName: "Lee",
        address: "123 Da Nang",
        gender: 1,
        roleid: "Admin",
        phoneNumber: "0123456789",
        positionId: "Master",
        image: "Hinh anh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  // ham "down" =>> rollback lai database old
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};

// tao data cho user
// npx sequelize-cli db:seed:all
// npx sequelize-cli db:seed:undo
