// server.js
const express = require('express');
const mongoose = require('mongoose');
const membersRoutes = require('./routes/members');
const authRoutes = require('./routes/auth');
const { getConfig } = require('./utils/cliArgs');
const config = require('./config/default');

const app = express();
app.use(express.json());

const finalConfig = getConfig(config);

mongoose.connect(finalConfig.mongoURI, {
  dbName: finalConfig.dbName,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

app.use('/api/members', membersRoutes);
app.use('/auth', authRoutes);

const PORT = finalConfig.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
