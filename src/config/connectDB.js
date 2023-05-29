// const { Sequelize } = require('sequelize');
import Sequelize from 'sequelize';

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
// let database = "testnodejs";
// let username = "root";
// let password = "43214321";

const sequelize = new Sequelize('testnodejs', 'root', '43214321', {
  host: 'localhost',
  dialect: 'mysql'
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

console.log('Hi connect DB');

let connectDB = async() => {
  console.log('Hi connect DB');
    try {
        await sequelize.authenticate();
        console.log('Connection DB has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB;