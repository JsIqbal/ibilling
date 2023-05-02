const { login, register, getUsers, logout } = require("./user.controller");
const validate = require("../../core/middlewares/validate");
const { registerSchema } = require("./user.schema");
const AuthStrategy = require("./user.authenticate.middleware");

module.exports = (app) => {
    app.route("/users")
        .get(AuthStrategy, getUsers)
        .post(validate(registerSchema), register);
    app.post("/users/login", login);
    app.post("/users/logout", AuthStrategy, logout);
};
