const Addition = require("../models/Addition");

// @desc    Get all addition high scores
// @route   GET /api/v1/addition
// @access  Public
exports.getAdditions = async (req, res, next) => {
  try {
    const additions = await Addition.find();

    res.status(200).json({
      success: true,
      count: additions.length,
      data: { additions },
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single addition high score
// @route   GET /api/v1/addition/:id
// @access  Public
exports.getAddition = async (req, res, next) => {
  try {
    const addition = await Addition.findById(req.params.id);

    if (!addition) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: addition,
    });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc    Get new addition score
// @route   POST /api/v1/addition
// @access  Private
exports.createAddition = async (req, res, next) => {
  try {
    const addition = await Addition.create(req.body);
    res.status(201).json({
      success: true,
      data: addition,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update addition score
// @route   PUT /api/v1/addition/:id
// @access  Private
exports.updateAddition = async (req, res, next) => {
  try {
    const addition = await Addition.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!addition) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: addition });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete addition score
// @route   DELETE /api/v1/addition/:id
// @access  Private
exports.deleteAddition = async (req, res, next) => {
  try {
    const addition = await Addition.findByIdAndDelete(req.params.id);

    if (!addition) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
