const sequelize = require('./config');
const User = require('./user');

module.exports = {
  init() {
    sequelize.sync().then(() => {
      console.log('Inited');
    });
  }
};
