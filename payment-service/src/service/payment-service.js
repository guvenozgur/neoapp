"use strict"

const Payment = require('../schema/payment');
const rest = require('../helper/rest');
const config = require('../config/config');
const paymentStatus = require('../config/payment-status');


module.exports = ()=>{

    const self = {
        payForTicket: async (eventName, userId, spot) => {
            let payment = new Payment({
                eventName: eventName,
                userId: userId,
                status: paymentStatus.PAID.id,
                spot: spot
            })
            payment.save()
            await rest().post(
                config.BOOKING_SERVICE_HOST+config.BOOKING_APPROVEMENT_PATH.replace(':name', eventName), 
                {spotLocation: spot, userId: userId})
        },
        cancelPayment: async (eventName, userId, spot) => {
            await Payment.findOneAndUpdate({eventName: eventName, userId: userId, 
                spot: spot, status: paymentStatus.PAID.id}, {status: paymentStatus.CANCELLED.id})
        }
    }

    return self;
}