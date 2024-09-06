const express = require('express')
const router = express.Router()
const { authValidation } = require('../middleware/auth')
const { eventValidationRules } = require('../middleware/event')
const { validateErrorHandler } = require('../middleware/validationErrorHandler')
const { getAllEvents, getEvent, createEvent, deleteEvent, updateEvent } = require('../controllers/events')

router
    .get('/', getAllEvents)
    .get('/:id', getEvent)
    .post('/', authValidation, eventValidationRules, validateErrorHandler, createEvent)
    .put('/:id', authValidation, eventValidationRules, validateErrorHandler, updateEvent)
    .delete('/:id', authValidation, deleteEvent)

module.exports = router