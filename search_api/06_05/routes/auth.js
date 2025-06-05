// routes/auth.js
const express = require('express');
const router = express.Router();
const { getConfig } = require('../utils/cliArgs');
const config = require('../config/default');
const finalConfig = getConfig(config);

router.post('/token', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    return res.json({ token: finalConfig.tokenSecret });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
