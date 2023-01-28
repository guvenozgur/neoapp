const EventDetail = require('../schema/event-detail');
const Reservation = require('../schema/reservation');
const Spot = require('../schema/spot');
const eventStatus = require('../config/event-status');
const reservationStatus = require('../config/reservation-status')

module.exports = ()=>{
    const self = {
        getEventDetailByName: async (name) => {
            let detail = EventDetail.find({name: name})
            return detail
        },
        getEventDetails: async (name) => {
            let detail = EventDetail.find()
            return detail
        },
        createEvent: async (name, capacity) => {
            let eventDetail = new EventDetail({
                name: name,
                capacity: capacity, 
                status: eventStatus.ACTIVE.id,
                availableCapacity: capacity
            })
            await eventDetail.save()
            let spots = new Array(capacity)
 
            for(let i =0; i < capacity; i++) {
                let spot = new Spot({
                    location: i,
                    available: true,
                    eventName: name
                })
                spots[i] = spot
            }

            await Spot.collection.insertMany (spots);
        },
        getAvailableSpots: async (eventName) => {
           let availableSpots = await Spot.find({eventName: eventName, available: true})
           return availableSpots.map(s=>{
                let {location, eventName} = s
                return {location, eventName}
            })
        },
        createReservation: async (eventName, location, userId) => {
           let spot = await Spot.findOneAndUpdate({eventName: eventName, location: location, available: true}, {available: false});
           if(spot) {
                let reservation = new Reservation({
                    eventName: eventName,
                    userId: userId,
                    status: reservationStatus.WAITING_FOR_PAYMENT.id,
                    spot: spot.location
                })
                await reservation.save()
           }
        },
        cancelReservation: async (eventName, spotLocation, userId) => {
            await Spot.findOneAndUpdate({eventName: eventName, location: spotLocation, available: false}, {available: true});
            await Reservation.findOneAndUpdate({eventName: eventName, userId: userId,  spot: spotLocation}, {status: reservationStatus.CANCELLED.id})
        },
        approveReservation: async(eventName, spotLocation, userId) => {
            await Reservation.findOneAndUpdate({eventName: eventName, userId: userId,  spot: spotLocation, status:reservationStatus.WAITING_FOR_PAYMENT.id}, {status: reservationStatus.APPROVED.id})
        },
        getReservations: async() => {
            let reservations = await Reservation.find();
            return reservations.map(r=>{
                let {eventName, userId, status, spot} = r
                return {eventName, userId, status, spot}
            })

        }
    }

    return self;
}