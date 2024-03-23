const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
    return jsonwebtoken.sign({
        _id: user._id,
        name: user.name
    }, process.env.TOKEN_KEY)
}

module.exports = jwtManager;