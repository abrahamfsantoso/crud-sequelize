const { Pelanggan } = require("../../models"); // Import all models
const validator = require("validator");

module.exports.create = async (req, res, next) => {
  try {
    let errors = [];
    // Find Pelanggan
    if (validator.isNumeric(req.body.nama)) {
      errors.push("Nama can't be a number");
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

module.exports.check = async (req, res, next) => {
  try {
    let data = await Pelanggan.findOne({
      where: { id: `${req.params.id}` },
    });

    if (!data) {
      return res.status(404).json({
        message: `Pelanggan ${req.params.id} Not Found`,
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
