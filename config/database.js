const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://localhost:27017/online-bid',
  secret: crypto,
  db: "online-bid"
};