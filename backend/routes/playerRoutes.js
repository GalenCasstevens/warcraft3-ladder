const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { getPlayersByExp } = require('../controllers/playerController');

router.route('/').get(getPlayersByExp);

module.exports = router;
