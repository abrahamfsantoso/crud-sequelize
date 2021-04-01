//const { ForeignKeyConstraintError } = require("sequelize/types");
const { Pemasok } = require("../models"); // Import all models

class PemasokController {
  // Get all Pemasok data
  async getAll(req, res) {
    try {
      let data = await Pemasok.findAll();

      if (!data) {
        return res.status(404).json({
          message: "Pemasok Not Found",
        });
      }

      return res.status(200).json({
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

  async getOne(req, res) {
    try {
      let data = await Pemasok.findOne({
        where: { id: req.params.id },
      });

      if (!data) {
        return res.status(404).json({
          message: "Pemasok Not Found",
        });
      }

      return res.status(200).json({
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

  async create(req, res) {
    try {
      let data = await Pemasok.create({
        nama: req.body.nama,
        image: req.body.image && req.body.image,
      });

      return res.status(200).json({
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

  async update(req, res) {
    try {
      let updatePemasok = await Pemasok.update(
        {
          nama: req.body.nama,
          image: req.body.image && req.body.image,
        },
        {
          where: { id: req.params.id },
        }
      );

      let data = await Pemasok.findOne({
        where: { id: req.params.id },
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

  async delete(req, res) {
    try {
      let data = await Pemasok.destroy({ where: { id: req.params.id } });

      if (!data) {
        return res.status(404).json({
          message: "Pemasok Not Found",
        });
      }

      return res.status(200).json({
        message: "Success delete Pemasok",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new PemasokController();
