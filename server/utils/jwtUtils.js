const jsonwebtoken = require('jsonwebtoken');
require("dotenv").config();

const PRIV_KEY = process.env.JWT_SECRET_KEY;
function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn });

    return {
        token: signedToken,
        expires: expiresIn
    }
}

module.exports = issueJWT;
