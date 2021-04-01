const e = require("express");
const { Barang, Pelanggan, Pemasok } = require("../models"); // Import all models

class BarangController {
  //get all barang
  async getAll(req, res) {
    try {
      let data = await Barang.findAll({
        attributes: ["id", "nama", "harga", "id_pemasok"],
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "data tidak ditemukan",
        });
      }
      return res.status(200).json({
        message: "sukses",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server Error",
        error: e,
      });
    }
  }

  // //get One with asynchronous
  // async getOne(req, res) {
  //   try {
  //     let data = await barang.findOne({
  //       where: { id: req.params.id },
  //       attributes: ["id", "nama", "harga", "id_pemasok"],
  //     });

  //     //if success
  //     return res.status(201).json({
  //       message: "Ini lohhh",
  //       data,
  //     });
  //   } catch (e) {
  //     return res.status(500).json({
  //       message: "error nih",
  //       error: e,
  //     });
  //   }
  // }

  //get One with promise

  getOne(req, res) {
    Barang
      .findOne({
        where: { id: req.params.id },
        attributes: ["id", "nama", "harga", "id_pemasok"],
      })
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: "ga ada barangnya",
          });
        }
        return res.status(200).json({
          message: "succeeessss",
          data,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          message: "internal server error",
          error: e,
        });
      });
  }

  // Create barang
  async create(req, res) {
    try {
      let createdData = await Barang.create({
        nama: req.body.nama,
        harga: req.body.harga,
        id_pemasok: req.body.id_pemasok,
        image: req.body.image && req.body.image,
      });

      let data = await Barang.findOne({
        where: {
          id: createdData.id,
        },
        attributes: ["id", "nama", "harga", "image", "createdAt", "updatedAt"],
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

  //delete
  async delete(req, res) {
    try {
      //delete data
      let data = await barang.destroy({ where: { id: req.params.id } });

      //if data deleted is null
      if (!data) {
        return res.status(404).json({
          message: "barang ga ada atau sudah kehapus",
        });
      }
      //if success
      return res.status(200).json({
        message: "Sukses terhapus",
      });
    } catch (e) {
      // console.log(e)
      return res.status(500).json({
        message: "Internal server error",
        error: e,
      });
    }
  }

  //update
  async update(req, res) {
    let update = {
      nama: req.body.nama,
      harga: req.body.harga,
      id_pemasok: req.body.id_pemasok,
      // image: req.body.image && req.body.image,
    };

    try {
      //tabel barang update data
      let updatedData = await Barang.update(update, {
        where: { id: req.params.id },
      });

      //find the updated transaksi
      let data = await Barang.findOne({
        where: { id: req.params.id },
        attributes: [
          "id",
          "nama",
          "harga",
          "id_pemasok",
          "image",
          ["createdAt", "dibuat pada"],
          ["updatedAt", "diupdate pada"],
        ],
      });
      // if success
      return res.status(201).json({
        message: "success",
        data,
      });
    } catch (e) {
      //if error
      // console.log(e);
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
}

module.exports = new BarangController();
