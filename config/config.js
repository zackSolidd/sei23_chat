const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    const token = req.header("x-auth-token");

    if(!token) {
        return res.status(401).json({
            message: "please take a token",
        });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWTCODE);

        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "token not valid",
        });
    }
}