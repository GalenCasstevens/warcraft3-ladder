const asyncHandler = require('express-async-handler');

// @desc    Get players by exp
// @route   GET /api/players
// @access  Public
const getPlayersByExp = asyncHandler(async (req, res) => {});

module.exports = {
	getPlayersByExp,
};
