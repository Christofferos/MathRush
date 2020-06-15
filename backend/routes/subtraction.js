const express = require("express");
const {
  getSubtractions,
  getSubtraction,
  createSubtraction,
  updateSubtraction,
  deleteSubtraction,
} = require("../controllers/subtraction.js");

const router = express.Router();

// Public access
router.route("/").get(getSubtractions).post(createSubtraction);

// Private access
router.route("/:id").get(getSubtraction).put(updateSubtraction).delete(deleteSubtraction);

module.exports = router;
