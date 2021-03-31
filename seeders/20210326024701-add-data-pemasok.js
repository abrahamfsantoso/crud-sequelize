"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Pemasok", [
      {
        nama: "Khay",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Heru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Siti",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Pemasok", null, {});
  },
};
