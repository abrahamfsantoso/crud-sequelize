"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transaksi", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_barang: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_pelanggan: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      jumlah: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL,
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

    queryInterface.addConstraint('Transaksi', {
      fields: ['id_pelanggan'],
      type: 'foreign key',
      name: 'custom_fkey_id_pelanggan',
      references: { //Required field
        table: 'Pelanggan',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transaksi");
  },
};
