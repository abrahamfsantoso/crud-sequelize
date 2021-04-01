
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
router.get("/", barangController.getAll);
router.get("/:id", barangController.getOne);
router.put("/:id", barangValidator.update, barangController.update);
// router.put("/:id", barangController.update);
router.delete("/:id", barangController.delete);
module.exports = router; // Export router