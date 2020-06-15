const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");
const Division = require("../models/Division");

// @desc    Get all division high scores
// @route   GET /api/v1/division
// @access  Public
exports.getDivisions = asyncHandler(async (req, res, next) => {
  const divisions = await Division.find();

  res.status(200).json({
    success: true,
    count: divisions.length,
    data: { divisions },
  });
});

// @desc    Get single division high score
// @route   GET /api/v1/division/:id
// @access  Public
exports.getDivision = asyncHandler(async (req, res, next) => {
  const division = await Division.findById(req.params.id);

  if (!division) {
    return next(new ErrorResponse(`Division not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: division,
  });
});

// @desc    Create new division score
// @route   POST /api/v1/division
// @access  Private
exports.createDivision = asyncHandler(async (req, res, next) => {
  const division = await Division.create(req.body);
  res.status(201).json({
    success: true,
    data: division,
  });
  next(err);
});

// @desc    Update division score
// @route   PUT /api/v1/division/:id
// @access  Private
exports.updateDivision = asyncHandler(async (req, res, next) => {
  const division = await Division.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!division) {
    return next(new ErrorResponse(`Division not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: division });
});

// @desc    Delete division score
// @route   DELETE /api/v1/division/:id
// @access  Private
exports.deleteDivision = asyncHandler(async (req, res, next) => {
  const division = await Division.findByIdAndDelete(req.params.id);

  if (!division) {
    return next(new ErrorResponse(`Division not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
