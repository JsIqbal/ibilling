const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");

const config = require("../../config");
const swagger = require("./swagger");

module.exports = () => {
    const app = require("express")();
    app.use(cookieParser("hi there"));

    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            return callback(null, true);
        },
    };
    app.use(cors(corsOptions));

    app.set("port", process.env.PORT);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const globalConfig = config.getGlobalConfig();

    globalConfig.routes.forEach((routePath) => {
        require(path.resolve(routePath))(app);
    });

    globalConfig.strategies.forEach((strategyPath) => {
        require(path.resolve(strategyPath))();
    });

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swagger.specs, swagger.uiOptions)
    );

    return app;
};
