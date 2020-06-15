const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");
const Subtraction = require("../models/Subtraction");

// @desc    Get all subtraction high scores
// @route   GET /api/v1/subtraction
// @access  Public
exports.getSubtractions = asyncHandler(async (req, res, next) => {
  const subtractions = await Subtraction.find();

  res.status(200).json({
    success: true,
    count: subtractions.length,
    data: { subtractions },
  });
});

// @desc    Get single subtraction high score
// @route   GET /api/v1/subtraction/:id
// @access  Public
exports.getSubtraction = asyncHandler(async (req, res, next) => {
  const subtraction = await Subtraction.findById(req.params.id);

  if (!subtraction) {
    return next(new ErrorResponse(`Subtraction not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: subtraction,
  });
});

// @desc    Create new subtraction score
// @route   POST /api/v1/subtraction
// @access  Private
exports.createSubtraction = asyncHandler(async (req, res, next) => {
  const subtraction = await Subtraction.create(req.body);
  res.status(201).json({
    success: true,
    data: subtraction,
  });
  next(err);
});

// @desc    Update subtraction score
// @route   PUT /api/v1/subtraction/:id
// @access  Private
exports.updateSubtraction = asyncHandler(async (req, res, next) => {
  const subtraction = await Subtraction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!subtraction) {
    return next(new ErrorResponse(`Subtraction not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: subtraction });
});

// @desc    Delete subtraction score
// @route   DELETE /api/v1/subtraction/:id
// @access  Private
exports.deleteSubtraction = asyncHandler(async (req, res, next) => {
  const subtraction = await Subtraction.findByIdAndDelete(req.params.id);

  if (!subtraction) {
    return next(new ErrorResponse(`Subtraction not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
