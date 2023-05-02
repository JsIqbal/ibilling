const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: true,
    sync: true,
});

module.exports = sequelize;
