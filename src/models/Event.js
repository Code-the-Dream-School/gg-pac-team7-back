const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date
    },
    address: {
        type: String,
        default: '',
    },
    coordinates: {
        type: [Number],
        required: true,
        default: undefined,
    },
    category: {
        type: String,
        enum: ['Clean-up', 'Greening', 'Wildlife'],
        default:'Clean-up',
        required: true
    },  
    description: {
        type: String,
        required: true
    },
    restrictions: {
        type: String,
        default: 'none'
    },
    hostName: {
        type: String,
    },
    eventUrl: {
        type: String
    },
    eventImages: {
        type: [String]
    }

},
{
    timestamps: true,  
})

module.exports = mongoose.model('Event', EventSchema) 