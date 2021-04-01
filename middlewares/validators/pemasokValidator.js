const { Pemasok } = require("../../models"); // Import all models
const validator = require("validator");

module.exports.create = async (req, res, next) => {
  try {
    if (validator.isNumeric(req.body.nama)) {
      return res.status(400).json({
        message: "Nama can't be a number!",
      });
    } else {
      // It means that will be go to the next middleware
      next();
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let findPemasok = await Pemasok.findOne({
      where: { id: req.params.id },
    });

    let errors = [];

    if (!findPemasok) {
      errors.push("Pemasok Not Found!");
    }

    if (validator.isNumeric(req.body.nama)) {
      errors.push("Nama can't be a number!");
    }

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
