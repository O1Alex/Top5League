const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

//Concernant les routes Auth
const authValidationRule = {
    register:[
        body("username")
            .isString().
            isLength({min : 3})
            .withMessage("Le pseudo doit contenir au moins 3 caractères"),
        body("email")
            .isEmail()
            .withMessage("L'Email doit être valide'"),
        body("password")
            .isLenght({min : 6})
            .withMessage("L'Email doit contenir au moins 6 caractères'"),
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
const monthValidationRule = {
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




}



module.exports = {
    validate,
    authValidationRule,
    monthValidationRule,
}