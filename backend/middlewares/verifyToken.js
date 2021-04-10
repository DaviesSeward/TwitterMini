const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
    const Authorization = req.header('Authorization');
    if (!Authorization) {
        // Error : unauthorized
        const err = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    }
    const token = Authorization.replace('Bearer ', '');
    const {userId} = jwt.verify(token,process.env.SECRET);
    req.user = {userId};

    next();
}