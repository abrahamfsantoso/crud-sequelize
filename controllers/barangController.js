const { barang, pelanggan, pemasok } = require("../models"); // Import all models
require("../utils/associations"); // Import table relationship


class BarangController {
  // Create barang
  async create(req, res) {
    try {
      let createdData = await barang.create({
        nama: req.body.nama,
        harga: req.body.harga,
        id_pemasok: req.body.id_pemasok,
        image: req.body.image && req.body.image,
      });

      let data = await barang.findOne({
        where: {
          id: createdData.id,
        },
        attributes: ["id", "harga", "image", "createdAt", "updatedAt"],
        include: [
          // Include is join
          { model: pemasok, attributes: ["nama"] },
        ],
      });

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new BarangController();
