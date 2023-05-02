const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const { generateAccessToken } = require("./user.service");

const register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, username } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).send({
                message: "A user with the same email address already exists.",
            });
        }

        const newUser = await User.create({
            email,
            password,
            firstName,
            lastName,
            username,
        });
        const { id, createdAt, updatedAt } = newUser;

        res.status(201).send({
            id,
            firstName,
            lastName,
            username,
            email,
            createdAt,
            updatedAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An internal server error occurred." });
    }
};

// const login = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({
//             where: {
//                 email,
//             },
//         });

//         if (!user || !user.password || !user.validPassword(password)) {
//             return res.status(400).send({ message: "Invalid Credentials" });
//         }

//         // console.log("---------------------------user", user);

//         const token = jwt.sign(
//             {
//                 id: user.id,
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//             },
//             process.env.TOKEN_SECRET,
//             { expiresIn: "1h", issuer: user.email }
//         );
//         user.dataValues.token = token;
//         delete user.dataValues.password;

//         res.cookie("access_token", token, {
//             httpOnly: true,
//         });
//         res.status(200).send({
//             message: "Logged In Successfully",
//             user,
//         });
//     } catch (err) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// };
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user || !user.password || !user.validPassword(password)) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }
        console.log(user);

        if (!user) {
            return res.status(400).send("Invalid credentials.");
        }

        res.cookie("access_token", generateAccessToken(user), {
            httpOnly: true,
            signed: true,
        });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);

        res.status(500).send("Internal server error.");
    }
};

async function logout(req, res) {
    try {
        // Clear the authentication token cookie
        res.clearCookie("access_token");

        res.status(200).send("Logout successful");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.login = login;
module.exports.register = register;
module.exports.getUsers = getUsers;
module.exports.logout = logout;
