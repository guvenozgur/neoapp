
const Event = require('../schema/event')
const eventStatus = require('../config/event-status')

function eventDtoMapper(events) {
    let eventList = events.map((event) => {
        let {name, category, status} = event
        return {name, category, status}
    })
    return eventList
}

module.exports = () => {
    
    const self =  {
        getAllEvents: async () => {
            let events = await Event.find()
            return eventDtoMapper(events)
        },
        getAllEventsByCategoryAndStatus: async (category, status) => {
            let events = await Event.find({category: category, status: status})
            return eventDtoMapper(events)
        },
        getEventByName: async (name) => {
            let events = await Event.find({name: name})
            return eventDtoMapper(events)
        },
        createEvent: async(name, category, status) => {
            let event = new Event({
                name: name,
                category: category,
                status: status
            })

            await event.save();
        },
        activateEvent: async(name) => {
            await Event.findOneAndUpdate({name: name}, {status: eventStatus.ACTIVE.id})
        }
        
    }
    return self;
}
