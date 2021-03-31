const { Pelanggan } = require("../models"); // Import all models
require("../utils/associations"); // Import table relationship

class PelangganController {
  // GET PELANGGAN
  async getAll(req, res) {
    try {
      let data = await Pelanggan.findAll({
        // find all data of Transaksi table
        attributes: ["id", "nama", "image", ["createdAt", "waktu"]], // just these attributes that showed
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

  //GET ONE PELANGGAN
  getOne(req, res) {
    Pelanggan.findOne({
      where: { id: `${req.params.id}` },
      attributes: ["id", "nama", "image", ["createdAt", "waktu"]],
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
  // Create PELANGGAN
  async create(req, res) {
    try {
      let createdData = await Pelanggan.create({
        nama: req.body.nama,
        image: req.body.image && req.body.image,
      });

      let data = await Pelanggan.findOne({
        where: {
          id: createdData.id,
        },
        attributes: ["id", "nama", "image", "createdAt", "updatedAt"],
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
    let id = req.params.id
    const { nama, image} = req.body
    try {
      const customer = await Pelanggan.findOne({ where: {id},
        attributes: ["id", "nama", "image", "updatedAt"]});
      

      customer.nama = nama
      customer.image = image

      await customer.save()

      // If success
      return res.status(201).json({
        message: "Success",
        data : customer 
        
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
      let data = await Pelanggan.destroy({ where: { id: req.params.id } });

      // If data deleted is null
      if (!data) {
        return res.status(404).json({
          message: "Pelanggan Not Found",
        });
      }

      // If success
      return res.status(200).json({
        message: `Successfully deleted pelanggan ${req.params.id}`,
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

module.exports = new PelangganController();
