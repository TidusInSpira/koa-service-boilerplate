const crypto = require('crypto');
const config = require('../../config');

module.exports = {
  encryptPassword(password) {
    const hash = crypto
      .createHmac('sha256', config.secret)
      .update(password)
      .digest('hex');
    return hash;
  }
};
