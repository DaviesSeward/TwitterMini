const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req,res,next) => {
    // Access Authorization form header
    const Authorization = req.header('Authorization');

    if (!Authorization) {
        req.user = null;
        next();
    } else {
        // Get token from Authorization
        const token = Authorization.replace('Bearer ', '');

        // verify token
        try {
            const {userId} = jwt.verify(token,process.env.SECRET);
            req.user = {userId};
            next();
        } catch (err) {
            req.user = null;
            next();
        }
    }
}