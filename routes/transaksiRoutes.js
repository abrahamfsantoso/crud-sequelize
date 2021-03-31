const express = require("express"); // Import express
const router = express.Router(); // Make router from app
const TransaksiController = require("../controllers/transaksiController.js"); // Import TransaksiController
const transaksiValidator = require("../middlewares/validators/transaksiValidator");

router.get("/", TransaksiController.getAll); // If accessing localhost:3000/transaksi, it will call getAll function in TransaksiController class
router.get("/:id", TransaksiController.getOne); // If accessing localhost:3000/transaksi/:id, it will call getOne function in TransaksiController class
router.post("/", transaksiValidator.create, TransaksiController.create); // If accessing localhost:3000/transaksi/create, it will call create function in TransaksiController class
router.put(
  "/:id",
  transaksiValidator.update,
  TransaksiController.update
); // If accessing localhost:3000/transaksi/update/:id, it will call update function in TransaksiController class
router.delete("/delete/:id", TransaksiController.delete); // If accessing localhost:3000/transaksi/delete/:id, it will call delete function in TransaksiController class

module.exports = router; // Export router
