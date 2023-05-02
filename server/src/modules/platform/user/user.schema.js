const { object, string, ref } = require("yup");

const registerSchema = object().shape({
    firstName: string()
        .min(2, "First name must be at least two charecters long.")
        .max(30, "Name must be at most 30 charecters long.")
        .required("Name must be required"),
    lastName: string()
        .min(2, "Last name must be at least two charecters long.")
        .max(30, "Name must be at most 30 charecters long.")
        .required("Name must be required"),
    email: string()
        .email("This field should be an valid Email.")
        .required("Email must be required"),
    password: string()
        .min(8, "Password must be at least 8 charecters long.")
        .required("Email must be required"),
    confirmPassword: string()
        .required("Confirm Password must be required")
        .oneOf(
            [ref("password"), null],
            "Password and Confirm password must be same"
        ),
});

module.exports.registerSchema = registerSchema;
