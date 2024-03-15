const jwt = require("jsonwebtoken");
const config = require("../CADViewer_config.json");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer header

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided' });

    try {
        const decoded = jwt.verify(token, config.jwtSecretKey);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

const verifyTokenOptional = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer header

    if (!token) {
        next();
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecretKey);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = { verifyToken, verifyTokenOptional };