// utils/cliArgs.js
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

function getConfig(defaults) {
  return {
    mongoURI: args.mongoURI || defaults.mongoURI,
    dbName: args.dbName || defaults.dbName,
    collectionName: args.collectionName || defaults.collectionName,
    tokenSecret: args.tokenSecret || defaults.tokenSecret,
    port: args.port || defaults.port,
  };
}

module.exports = { getConfig };
