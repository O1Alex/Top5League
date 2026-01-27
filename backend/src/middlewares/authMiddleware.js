const jwt = require("jsonwebtoken");

function authenticate(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({message: "Token manquant"});
    }

    const token = authHeader.split(" ")[1];
        // Vérifié le token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {id: payload, role: payload.role}
            next();
        } catch (error) {
            return res.status(401).json({message: "Token invalidé"});
        }
}

function requireAdmin(req, res, next){
    if (req.user.role !== "admin") {
        return res.status(403).json({message: "Accès refucé, administrateur uniquement"});
    }
    next();
}

module.exports = { authenticate, requireAdmin };