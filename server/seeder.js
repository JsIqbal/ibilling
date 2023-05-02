const async = require("async");

async function init() {
    const config = require("./src/config");
    config.initEnvironmentVariables();

    const sequelize = require("./src/config/lib/sequelize");

    await sequelize.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );

    const User = require("./src/modules/platform/user/user.model");

    await sequelize.sync();

    function userSeeder(callback) {
        User.findOrCreate({
            where: { email: "js@gmail.com" },
            defaults: {
                firstName: "sam",
                lastName: "dixon",
                username: "System",
                password: "P@ssword123",
            },
        }).then((users) => {
            callback(null, users[0].id);
        });
    }

    async.waterfall([userSeeder], (err) => {
        if (err) console.error(err);
        else console.log("DB seed completed");
        process.exit();
    });
}

init();
