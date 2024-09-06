const jwt = require('jsonwebtoken')
const { body } = require('express-validator')
const { StatusCodes } = require('http-status-codes') 

const registerValidationRules = [
    body('email', "Wrong email format, valid example: youremail@mailservice.com").trim().notEmpty().isEmail().isLength({ max: 50 }),
    body('password', "Required length is 4 to 30. Use only [A-Z, a-z, 0-9]").trim().isAlphanumeric().isLength({min: 4, max: 30}),
    body('firstName', "Required length is 3 to 20. Use only [A-Z, a-z]").trim().isAlpha().isLength({min: 3, max: 20}),
    body('lastName', "Required length is 3 to 20. Use only [A-Z, a-z]").trim().isAlpha().isLength({min: 3, max: 20}),
    body('userName', "Required length is 3 to 20. Use only [A-Z, a-z, 0-9]").trim().matches(/^[a-z0-9?^]+$/i).isLength({min: 3, max: 20}).optional({nullable: true, checkFalsy: true})
]

const loginValidationRules = [
    body('email', "Wrong email format, valid example: youremail@mailservice.com").trim().notEmpty().isEmail().isLength({ max: 50 }),
    body('password', "Required length is 4 to 30. Use only [A-Z, a-z, 0-9]").trim().isAlphanumeric().isLength({min: 4, max: 30})
]

const authValidation = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer"))
        {
            return res.status(StatusCodes.UNAUTHORIZED).json([{ msg: "Authentication Error" }])
        }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()
   } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json([{ msg: "Authentication Error" }])
   }
}

module.exports = {
    registerValidationRules,
    loginValidationRules,
    authValidation
}