const express = require("express");
const {
  getMultiplications,
  getMultiplication,
  createMultiplication,
  updateMultiplication,
  deleteMultiplication,
} = require("../controllers/multiplication.js");

const router = express.Router();

// Public access
router.route("/").get(getMultiplications).post(createMultiplication);

// Private access
router.route("/:id").get(getMultiplication).put(updateMultiplication).delete(deleteMultiplication);

module.exports = router;
