const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");
const Addition = require("../models/Addition");

// @desc    Get all addition high scores
// @route   GET /api/v1/addition
// @access  Public
exports.getAdditions = asyncHandler(async (req, res, next) => {
  const additions = await Addition.find();

  res.status(200).json({
    success: true,
    count: additions.length,
    data: { additions },
  });
});

// @desc    Get single addition high score
// @route   GET /api/v1/addition/:id
// @access  Public
exports.getAddition = asyncHandler(async (req, res, next) => {
  const addition = await Addition.findById(req.params.id);

  if (!addition) {
    return next(new ErrorResponse(`Addition not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: addition,
  });
});

// @desc    Create new addition score
// @route   POST /api/v1/addition
// @access  Private
exports.createAddition = asyncHandler(async (req, res, next) => {
  // Used to manipulate data
  // let query;
  // let queryStr = JSON.stringify(req.query);
  // queryStr = queryStr.replace();

  const addition = await Addition.create(req.body);
  res.status(201).json({
    success: true,
    data: addition,
  });
  next(err);
});

// @desc    Update addition score
// @route   PUT /api/v1/addition/:id
// @access  Private
exports.updateAddition = asyncHandler(async (req, res, next) => {
  const addition = await Addition.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!addition) {
    return next(new ErrorResponse(`Addition not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: addition });
});

// @desc    Delete addition score
// @route   DELETE /api/v1/addition/:id
// @access  Private
exports.deleteAddition = asyncHandler(async (req, res, next) => {
  const addition = await Addition.findByIdAndDelete(req.params.id);

  if (!addition) {
    return next(new ErrorResponse(`Addition not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
