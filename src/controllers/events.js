const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes') 

const getAllEvents = async (req, res) => {
    let sortMethod = {}
        if(req.query.date){
            sortMethod = { 'startDate':Number(req.query.date) }
        }
        else if (req.query.title){
            sortMethod = { 'title':Number(req.query.title) }
        }
    let method = {}
        if(req.query.category){
            method = {'category':String(req.query.category) }
        } 
        try {    
            const events = await Event.find(method).sort(sortMethod)
            res.status(StatusCodes.OK).json(events)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed retrieving events" }])
        }
}

const getEvent = async (req, res) => {
    try {
        const eventId = req.params.id
        await Event.findOne({ _id: eventId })
            .then(event => {
                if (!event) {
                    return res.status(StatusCodes.NOT_FOUND).json([{ 
                        type: "field",
                        value: `${eventId}`,
                        msg: "Event not found!",
                        path: "id",
                        location: "params" 
                    }])
                }
                res.status(StatusCodes.OK).json(event)
            })
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed retrieving event" }])
    }
}

const createEvent = async (req, res) => {
    try {
        const eventModel = new Event({
            //required
            title: req.body.title,
            startDate: req.body.startDate,
            category: req.body.category,
            coordinates: req.body.coordinates,
            description: req.body.description,
            hostName: req.body.hostName,
            eventUrl: req.body.eventUrl,
            //non-required
            endDate: req.body.endDate,
            address: req.body.address,
            restrictions: req.body.restrictions,
            eventImages: req.body.eventImages      
        })
     
        const event = await Event.create(eventModel)
        res.status(StatusCodes.CREATED).json(event)
    } catch (error) {
        if (error.code == 11000) {
            const errorData = Object.entries(error.keyValue).flat()
            return res.status(StatusCodes.CONFLICT).json([{
                type: "field",
                value: `${errorData[1]}`,
                msg: `This ${errorData[0]} is already registered`,
                path: `${errorData[0]}`,
                location: "body"
              }]) 
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to create event" }])
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id
        await Event.findOneAndDelete({
            _id: eventId,
        }).then(done => {
            if (!done) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "An error occurred while trying to delete" }])
            }
            res.status(StatusCodes.OK).json({ msg: "Successfully deleted" })
        })
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to delete event" }])
    }
}

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id
        await Event.findOneAndUpdate({
            _id: eventId,
        }, {
            //required
            title: req.body.title,
            startDate: req.body.startDate,
            category: req.body.category,
            coordinates: req.body.coordinates,
            description: req.body.description,
            hostName: req.body.hostName,
            eventUrl: req.body.eventUrl,
            //non-required
            endDate: req.body.endDate,
            address: req.body.address,
            restrictions: req.body.restrictions,
            eventImages: req.body.eventImages
        })
        
        res.status(StatusCodes.OK).json({ msg: "Event is successfully updated!" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed updating event" }])
    }
}


module.exports = { 
    getAllEvents, 
    getEvent, 
    createEvent, 
    deleteEvent, 
    updateEvent
}