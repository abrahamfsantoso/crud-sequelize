const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import middlewares
const { imageUpload } = require("../middlewares/uploads/imageUpload");
const barangValidator = require("../middlewares/validators/barangValidator");

// Import controller
const barangController = require("../controllers/barangController");

// If POST (/barang), will go to imageUpload first
// Then, go to transaksiValidator.create
// If in the transaksiValidator.create can run the next(), it will go to transaksiController.create
router.post("/", imageUpload, barangValidator.create, barangController.create);

module.exports = router; // Export router
