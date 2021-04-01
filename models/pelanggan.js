"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pelanggan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pelanggan.init(
    {
      nama: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        //Set custom getter for book image using URL
        get() {
          const image = this.getDataValue("image");
          return "/images/" + image;
        },
    },
  },{
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      

      modelName: "Pelanggan",
    }


  );
  return Pelanggan;
};
