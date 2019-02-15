const Sequelize = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    dialect: config.database.dialect,
    timezone: config.database.timezone,
    logging: config.database.logging
  }
);

module.exports = sequelize;
