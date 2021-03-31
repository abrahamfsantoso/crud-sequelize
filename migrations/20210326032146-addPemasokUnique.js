"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("Pemasok", {
      fields: ["nama"],
      type: "unique",
      name: "custom_unique_nama",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
