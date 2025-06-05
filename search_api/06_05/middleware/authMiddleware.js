
// middleware/authMiddleware.js
const { getConfig } = require('../utils/cliArgs');
const config = require('../config/default');
const finalConfig = getConfig(config);

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== `Bearer ${finalConfig.tokenSecret}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
