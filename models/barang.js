"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barang.init(
    {
      nama: DataTypes.STRING,
      harga: DataTypes.DECIMAL,
      id_pemasok: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,

      modelName: "Barang",
    }
  );
  return Barang;
};
