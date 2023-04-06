// ok this is where we take the jwt from the requester, we verify it, and then if its all good,
// we send the requested response, and eventually all calls with follow this protocol in some way.
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors')

// remember the middleware just receives the request, uses the data (JWT token), completes a check, then passes it on to the next function in the routes!

const authenticationMiddleware = async (req, res, next) => {   
    try {
        const authHeader = req.headers.authorization;        

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UnauthenticatedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId, name } = decoded;
        req.user = { userId, name };
        console.log(req.user, ' AUTH ')
        return next();
    } catch (error) {
        console.log('auth error', error)
        return next(error);
    }
}

module.exports = authenticationMiddleware;
