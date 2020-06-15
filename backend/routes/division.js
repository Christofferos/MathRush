const express = require("express");
const {
  getDivisions,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
} = require("../controllers/division.js");

const router = express.Router();

// Public access
router.route("/").get(getDivisions).post(createDivision);

// Private access
router.route("/:id").get(getDivision).put(updateDivision).delete(deleteDivision);

module.exports = router;
