const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    console.log("-------------------user----------------", user);
    const access_token = jwt.sign(
        {
            id: user.id,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "1h",
            issuer: user.id.toString(),
        }
    );

    return access_token;
};

module.exports.generateAccessToken = generateAccessToken;
