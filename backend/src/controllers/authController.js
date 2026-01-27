const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
    try {
        const { username, email, password, favorite_player } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email déjà utilisé",
            });
        }

        const pwdHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: pwdHash,
            favorite_player,
        });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            data: { user: sanitizerUser(user), token },
            message: "Utilisateur enregistré avec succès",
        });

    } catch (error) {
        console.error("Erreur lors de la création du compte", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
        });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email ou mot de passe incorrect",
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Email ou mot de passe incorrect",
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            data: { user: sanitizerUser(user), token },
            message: "Utilisateur connecté avec succès",
        });

    } catch (error) {
        console.error("Erreur login", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
        });
    }
};


// getMe
const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

        res.status(201).json({
            success: true,
            data: sanitizerUser,
        });

    } catch (error) {
        console.error("Erreur login", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
        });
    }
};

function sanitizerUser(user) {
    const plainUser = user.get({ plain: true });
    delete plainUser.password;
    return plainUser;
}

module.exports = { register, login, getMe };
