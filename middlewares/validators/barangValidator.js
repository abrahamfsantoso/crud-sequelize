const { barang, pelanggan, pemasok } = require("../../models"); // Import all models
const validator = require("validator");
const e = require("express");

module.exports.create = async (req, res, next) => {
  try {
    // Find Pemasok
    let findPemasok = await pemasok.findOne({
      where: { id: req.body.id_pemasok },
    });

    let errors = [];

    // Pemasok not found
    if (!findPemasok) {
      errors.push("Pemasok Not Found");
    }

    // Check harga is number
    if (!validator.isNumeric(req.body.harga)) {
      errors.push("Harga must be a number");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.update = async (req, res, next) => {
  try {
    // Find barang, pelanggan, transaksi
    let findData = await Promise.all([
      pemasok.findOne({
        where: { id: req.body.id_pemasok },
      }),
      barang.findOne({
        where: { id: req.params.id }, // because we will update transaksi
      }),
    ]);

    // Create errors variable
    let errors = [];

    // If pemasok not found
    if (!findData[0]) {
      errors.push("pemasok Not Found");
    }

    // If barang not found
    if (!findData[1]) {
      errors.push("barang Not Found");
    }

    if (!validator.isNumeric(req.body.harga)) {
      errors.push("harga must be a number");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
