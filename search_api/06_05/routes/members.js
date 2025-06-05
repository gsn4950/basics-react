// routes/members.js
const express = require('express');
const router = express.Router();
const { getMembers } = require('../controllers/membersController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getMembers);

module.exports = router;
