// const {dbLog} = require("./winston");
const {dbLog} = require("./winston");
require("dotenv").config();

const pool = {
  max: Number(process.env.DB_POOL_MAX || 100),
  min: Number(process.env.DB_POOL_MIN || 10),
  acquire: 30000,
  idle: 10000
};

const dialectOptions = {
  decimalNumbers: true
};

const dbLogging = (str, time) => {
  // dbLog.info(str, time);
  // dbLog.info(`Timed: ${time} ms`);
};

module.exports = {
  local: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
    pool: pool,
    port: process.env.DB_PORT || "3306",
    benchmark: true,
    logging: dbLogging,
    dialectOptions
  },
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
    pool: pool,
    port: process.env.DB_PORT || "3306",
    benchmark: true,
    logging: dbLogging,
    dialectOptions
  },
  test: {
    username: "database_test",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mssql",
    operatorsAliases: 0,
    pool: pool
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
    pool: pool,
    port: process.env.DB_PORT || "3306",
    benchmark: true,
    logging: dbLogging,
    dialectOptions
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "db_new",
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
    pool: pool,
    port: process.env.DB_PORT || "3306",
    benchmark: true,
    logging: dbLogging,
    dialectOptions
  }
};
