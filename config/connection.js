require('dotenv').config();
const Sequelize = require('sequelize')

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
    sequelize = new Sequelize(
        process.env.MYSQL_DB,
        process.env.MYSQL_USER,
        process.env.MYSQL_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        }

    );
}

module.exports = sequelize;
