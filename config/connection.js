const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if ('postgres://techblog_38jb_user:DXdJ67dQIyIkV5m8z5FP4yqY1D8VvtX8@dpg-cp43aen79t8c73e9qrvg-a/techblog_38jb') {
  sequelize = new Sequelize('postgres://techblog_38jb_user:DXdJ67dQIyIkV5m8z5FP4yqY1D8VvtX8@dpg-cp43aen79t8c73e9qrvg-a/techblog_38jb');
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;
