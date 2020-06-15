const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");
const Multiplication = require("../models/Multiplication");

// @desc    Get all multiplication high scores
// @route   GET /api/v1/multiplication
// @access  Public
exports.getMultiplications = asyncHandler(async (req, res, next) => {
  const multiplications = await Multiplication.find();

  res.status(200).json({
    success: true,
    count: multiplications.length,
    data: { multiplications },
  });
});

// @desc    Get single multiplication high score
// @route   GET /api/v1/multiplication/:id
// @access  Public
exports.getMultiplication = asyncHandler(async (req, res, next) => {
  const multiplication = await Multiplication.findById(req.params.id);

  if (!multiplication) {
    return next(new ErrorResponse(`Multiplication not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: multiplication,
  });
});

// @desc    Create new multiplication score
// @route   POST /api/v1/multiplication
// @access  Private
exports.createMultiplication = asyncHandler(async (req, res, next) => {
  const multiplication = await Multiplication.create(req.body);
  res.status(201).json({
    success: true,
    data: multiplication,
  });
  next(err);
});

// @desc    Update multiplication score
// @route   PUT /api/v1/multiplication/:id
// @access  Private
exports.updateMultiplication = asyncHandler(async (req, res, next) => {
  const multiplication = await Multiplication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!multiplication) {
    return next(new ErrorResponse(`Multiplication not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: multiplication });
});

// @desc    Delete multiplication score
// @route   DELETE /api/v1/multiplication/:id
// @access  Private
exports.deleteMultiplication = asyncHandler(async (req, res, next) => {
  const multiplication = await Multiplication.findByIdAndDelete(req.params.id);

  if (!multiplication) {
    return next(new ErrorResponse(`Multiplication not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
