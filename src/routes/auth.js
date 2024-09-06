const express = require('express')
const router = express.Router()
const { registerUser, loginUser, checkUser } = require('../controllers/auth')
const { registerValidationRules, loginValidationRules, authValidation } = require('../middleware/auth')
const { validateErrorHandler } = require('../middleware/validationErrorHandler')

router
.post('/register', registerValidationRules, validateErrorHandler, registerUser)
.post('/login', loginValidationRules, validateErrorHandler, loginUser)
.get('/me', authValidation, checkUser)

module.exports = router