const express = require("express");
const {
  getAdditions,
  getAddition,
  createAddition,
  updateAddition,
  deleteAddition,
} = require("../controllers/addition.js");

const router = express.Router();

// Public access
router.route("/").get(getAdditions).post(createAddition);

// Private access
router.route("/:id").get(getAddition).put(updateAddition).delete(deleteAddition);

module.exports = router;
