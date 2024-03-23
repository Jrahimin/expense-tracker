const jsonwebtoken = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.replace('Bearer ', '');

        req.user = await jsonwebtoken.verify(accessToken, process.env.TOKEN_KEY);
    } catch (e) {
        return res.status(401).json({
            message: "Authorization failed",
        });
    }

    next();
}

module.exports = auth;