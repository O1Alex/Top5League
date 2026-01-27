const { body, param, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

//Concernant les routes Auth
const authValidationRules = {
    register:[
        body("username")
            .isString()
            .isLength({min : 3})
            .withMessage("Le pseudo doit contenir au moins 3 caractères"),

        body("email")
            .isEmail()
            .withMessage("L'Email doit être valide'"),

        // body("password")
        //     .isLenght({min : 6})
        //     .withMessage("L'Email doit contenir au moins 6 caractères'"),
    ],
    login:[
        body("email")
            .isEmail()
            .withMessage("L'Email doit être valide'"),
        body("password")
            .notEmpty() 
            .withMessage("Mot de passe recquis'"),
    ],
}


//Pour Months
const monthValidationRules = {
    create: [
        body("label")
            .notEmpty()
            .withMessage("Le label est obligatoire")
            .isString()
            .trim()
            .isLength({ min: 3 })
            .withMessage("Le label doit contenir au moins 3 caractères"),

        body("start_date")
            .notEmpty()
            .withMessage("La date de début est requise")
            .isISO8601()
            .withMessage("La date de début doit être une date valide (YYYY-MM-DD)"),

        body("end_date")
            .notEmpty()
            .withMessage("La date de fin est requise")
            .isISO8601()
            .withMessage("La date de fin doit être une date valide (YYYY-MM-DD)"),

        body("publish_date")
            .notEmpty()
            .withMessage("La date de publication est requise")
            .isISO8601()
            .withMessage("La date de publication doit être une date valide (YYYY-MM-DD)"),

        body("status")
            .optional()
            .isIn(["open", "closed", "published"])
            .withMessage("Le status doit être : open, closed ou published"),
    ],
    update: [
        body("label")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Le label ne peut pas être vide"),

        body("start_date")
            .optional()
            .isISO8601()
            .withMessage("La date de début doit être au format YYYY-MM-DD"),

        body("end_date")
            .optional()
            .isISO8601()
            .withMessage("La date de fin doit être au format YYYY-MM-DD"),

        body("publish_date")
            .optional()
            .isISO8601()
            .withMessage("La date de publication doit être au format YYYY-MM-DD"),

        body("status")
            .optional()
            .isIn(["open", "closed", "published"])
            .withMessage("Le status doit être open, closed ou published"),
    ],

    idParam: [
        param("id")
        .isInt({ min: 1 })
        .withMessage("L'id du mois doit être un entier valide"),
    ],
}

// Pour MonthlyPlayer
const monthlyPlayerValidationRules = {
  create: [
        body("fullname")
            .trim()
            .notEmpty()
            .withMessage("Le nom du joueur est obligatoire")
            .isLength({ max: 100 })
            .withMessage("Le nom du joueur ne doit pas dépasser 100 caractères"),

        body("position")
            .notEmpty()
            .withMessage("La position est obligatoire")
            .isIn(["PG", "SG", "SF", "PF", "C"])
            .withMessage("La position doit être PG, SG, SF, PF ou C"),

        body("team_name")
            .optional()
            .trim()
            .isLength({ max: 100 })
            .withMessage("Le nom de l'équipe ne doit pas dépasser 100 caractères"),

        body("pts")
            .notEmpty()
            .withMessage("Les points sont obligatoires")
            .isFloat({ min: 0 })
            .withMessage("Les points doivent être un nombre positif"),

        body("ast")
            .notEmpty()
            .withMessage("Les passes sont obligatoires")
            .isFloat({ min: 0 })
            .withMessage("Les passes doivent être un nombre positif"),

        body("reb")
            .notEmpty()
            .withMessage("Les rebonds sont obligatoires")
            .isFloat({ min: 0 })
            .withMessage("Les rebonds doivent être un nombre positif"),

        body("photo_url")
            .optional()
            .isURL()
            .withMessage("L'URL de la photo doit être valide"),
    ],

  update: [
        body("fullname")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Le nom du joueur ne peut pas être vide"),

        body("position")
            .optional()
            .isIn(["PG", "SG", "SF", "PF", "C"])
            .withMessage("Position invalide"),

        body("team_name")
            .optional()
            .trim(),

        body("pts")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Les points doivent être un nombre positif"),

        body("ast")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Les passes doivent être un nombre positif"),

        body("reb")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Les rebonds doivent être un nombre positif"),

        body("photo_url")
            .optional()
            .isURL()
            .withMessage("L'URL de la photo doit être valide"),
    ],

    idParam: [
        param("id")
            .isInt({ min: 1 })
            .withMessage("L'id du joueur doit être un entier valide"),
    ],
};


module.exports = {
    validate,
    authValidationRules,
    monthValidationRules,
    monthlyPlayerValidationRules
}