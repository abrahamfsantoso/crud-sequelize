const { Transaksi, Barang, Pelanggan, Pemasok } = require("../models"); // Import all models
require("../utils/associations"); // Import table relationship

class TransaksiController {
  // Get all transaksi data
  async getAll(req, res) {
    try {
      let data = await Transaksi.findAll({
        // find all data of Transaksi table
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]], // just these attributes that showed
        include: [
          // Include is join
          {
            model: Barang,
            attributes: ["nama"], // just this attrubute from Barang that showed
            include: [
              // Include is join
              { model: Pemasok, attributes: ["nama"] },
            ],
          },
          {
            model: Pelanggan,
            attributes: ["nama"], // just this attrubute from Pelanggan that showed
          },
        ],
      });

      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  getOne(req, res) {
    Transaksi.findOne({
      where: { id: `${req.params.id}` },
      attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]],
      include: [
        {
          model: Barang,
          attributes: ["nama", "harga"],
          include: [{ model: Pemasok, attributes: ["nama"] }],
        },
        { model: Pelanggan, attributes: ["nama"] },
      ],
    })
      .then((data) => {
        return res.status(200).json({
          message: "Success",
          data: data,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          message: "Internal Server Error",
          error: e,
        });
      });
  }
  // Create Transaksi data
  async create(req, res) {
    try {
      let findBarang = await Barang.findOne({
        // find one data of Barang table
        where: {
          id: req.body.id_barang, // where id of Barang table is equal to req.params.id
        },
      });
      let price = findBarang.harga;
      let total = eval(price * req.body.jumlah);
      let createData = await Transaksi.create({
        id_barang: req.body.id_barang,
        id_pelanggan: req.body.id_pelanggan,
        jumlah: req.body.jumlah,
        total: total,
      });

      let data = await Transaksi.findOne({
        where: { id: createData.id },
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]],
        include: [
          {
            model: Barang,
            attributes: ["nama", "harga"],
            include: [{ model: Pemasok, attributes: ["nama"] }],
          },
          { model: Pelanggan, attributes: ["nama"] },
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

// Update data
async update(req, res) {
  let update = {
    id_barang: req.body.id_barang,
    id_pelanggan: req.body.id_pelanggan,
    jumlah: req.body.jumlah,
    total: req.body.total,
  };

  try {
    // Transaksi table update data
    let updatedData = await transaksi.update(update, {
      where: {
        id: req.params.id,
      },
    });

    // Find the updated transaksi
    let data = await transaksi.findOne({
      where: { id: req.params.id },
      attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]], // just these attributes that showed
      include: [
        // Include is join
        {
          model: barang,
          attributes: ["nama", "harga"], // just this attrubute from Barang that showed
          include: [
            // Include is join
            { model: pemasok, attributes: ["nama"] },
          ],
        },
        {
          model: pelanggan,
          attributes: ["nama"], // just this attrubute from Pelanggan that showed
        },
      ],
    });

    // If success
    return res.status(201).json({
      message: "Success",
      data,
    });
  } catch (e) {
    // If error
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
}

// Delete Data
async delete(req, res) {
  try {
    // Delete data
    let data = await transaksi.destroy({ where: { id: req.params.id } });

    // If data deleted is null
    if (!data) {
      return res.status(404).json({
        message: "Transaksi Not Found",
      });
    }

    // If success
    return res.status(200).json({
      message: "Success delete transaksi",
    });
  } catch (e) {
    // If error
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
}
}

module.exports = new TransaksiController();
