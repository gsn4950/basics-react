// models/member.js
const { getConfig } = require("../utils/cliArgs");
const config = require("../config/default");
const finalConfig = getConfig(config);

const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({}, { strict: false }); // Dynamic structure
module.exports = mongoose.model(
  "Member",
  memberSchema,
  finalConfig.collectionName
);
