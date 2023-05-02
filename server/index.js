(() => {
    const path = require("path");
    const app = require(path.join(process.cwd(), "/src/config/lib/app.js"));

    const config = require(path.join(process.cwd(), "/src/config"));
    config.initEnvironmentVariables();

    app.start();
})();
