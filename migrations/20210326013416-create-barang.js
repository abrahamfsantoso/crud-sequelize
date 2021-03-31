"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Barang", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      harga: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      id_pemasok: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: true,
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    queryInterface.addConstraint("Barang", {
      fields: ["id_pemasok"],
      type: "foreign key",
      name: "custom_fkey_id_pemasok",
      references: {
        //Required field
        table: "Pemasok",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Barang");
  },
};
