const { body } = require('express-validator')

const eventValidationRules = [
    body('title', "Minimum length is 10, maximum - 100").trim().isLength({ min: 10, max: 100 }),
    body('startDate', "Any valid Date format required").trim().isISO8601(),
    body('endDate', "Any valid Date format required").trim().isISO8601().optional({ nullable: true, checkFalsy: true }),
    body('address', "Provide valid Event's address").trim().isString(),
    body('coordinates', "An array of [lat, lng] is required").trim().isNumeric().isArray({ min:2, max:2 }),
    body('category', "Valid category type is required").trim().isString(),
    body('description', "Description is required, not less than 20 characters").trim().isString().isLength({ min: 20 }),
    body('restrictions', "Provide valid restrictions").trim().isString().optional({ nullable: true, checkFalsy: true }),
    body('hostName', "Provide valid host name").trim().isString(),
    body('eventUrl', "Event's URL is required").trim().isURL(),
    body('eventImages', "Valid Image Links are required, multiple values allowed").trim().isURL().isArray({ min:1 }).optional({ nullable: true, checkFalsy: true })
]

module.exports = {
    eventValidationRules
}