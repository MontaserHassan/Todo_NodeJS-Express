const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const error = require('../error_success/error_success');


const { JWT_SECRET = 'test' } = process.env;


///// authentication for user (verify JWT -authentication middleware-) /////

const auth = async(req, res, next) => {
    // developers sent token into variable called authorization
    try {
        const {authorization} = req.headers;
        const token = jwt.verify(authorization, JWT_SECRET);
        const user = await User.findById(token.id).exec();
        req.user = user; // this is variable --> to call it into any place in routes - "instead of each one call jwt"
        res.status(202);
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json(error.errorUserNameOrPassword);
    }
}

module.exports = {
    auth
};