const express = require('express');
const router = express.Router();


const { imageUpload } = require('../middlewares/uploads/imageUpload');
const pemasokValidator = require('../middlewares/validators/pemasokValidator');

const pemasokController = require('../controllers/pemasokController');

router.get("/", pemasokController.getAll);
router.get("/:id", pemasokController.getOne);
router.post("/", imageUpload, pemasokValidator.create, pemasokController.create);
router.put("/:id", imageUpload, pemasokValidator.update, pemasokController.update);
router.delete("/:id", pemasokController.delete);

module.exports = router;
