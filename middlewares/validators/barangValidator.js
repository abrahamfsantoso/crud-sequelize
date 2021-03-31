const { Barang, Pelanggan, Pemasok } = require("../../models"); // Import all models
const validator = require("validator");

module.exports.create = async (req, res, next) => {
  try {
    // Find Pemasok
    let findPemasok = await Pemasok.findOne({
      where: {
        id: req.body.id_pemasok,
      },
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
