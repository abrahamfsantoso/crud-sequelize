const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import middlewares
const { imageUpload } = require("../middlewares/uploads/imageUpload");
const PelangganValidator = require("../middlewares/validators/pelangganValidator");

// Import controller
const PelangganController = require("../controllers/pelangganController");

router.get("/", PelangganController.getAll); 
router.get("/:id", PelangganValidator.check, PelangganController.getOne);
router.post("/", imageUpload, PelangganValidator.create, PelangganController.create);
router.put("/:id", imageUpload, PelangganValidator.check, PelangganController.update);
router.delete("/:id", PelangganController.delete);


module.exports = router; // Export router
