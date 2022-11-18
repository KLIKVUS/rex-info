const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");


module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") return next();

    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) return res.status(401).json({ message: "Пройдите авторизацию." });

        const decoded = jwt.verify(token, config.get("jwtSecret"));
        const user = User.findById(decoded.userId);

        req.user = user;

        next();
    } catch (e) {
        res.status(401).json({ message: "Пройдите авторизацию." });
    }
}