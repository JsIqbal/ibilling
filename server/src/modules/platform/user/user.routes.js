const {
    login,
    register,
    getUsers,
    logout,
    updateUser,
} = require("./user.controller");
const validate = require("../../core/middlewares/validate");
const { registerSchema, updateUserSchema } = require("./user.schema");
const AuthStrategy = require("./user.authenticate.middleware");

module.exports = (app) => {
    app.route("/users")
        .get(AuthStrategy, getUsers)
        .post(AuthStrategy, validate(registerSchema), register)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);
    app.post("/users/login", login);
    app.post("/users/logout", AuthStrategy, logout);
};
