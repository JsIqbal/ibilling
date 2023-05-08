const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Billing",
            description: "Billing API Documentation",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/config/lib/swagger/*.yaml"],
};

const specs = swaggerJsdoc(options);

const uiOptions = {
    swaggerOptions: {
        docExpansion: "list",
    },
};

exports.specs = specs;
exports.uiOptions = uiOptions;
