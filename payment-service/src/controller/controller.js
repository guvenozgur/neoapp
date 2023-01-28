"use strict"

const {routeMappings} = require('../config/mappings');
const RESTStatus = require('../config/rest-status-code');
const router = require('express').Router();
const paymentService = require('../service/payment-service')();

module.exports = ()=>{

    router.post(routeMappings.PAYMENT, async (req, res)=>{
        try{
            let {eventName, userId, spotLocation} = req.body
            await paymentService.payForTicket(eventName, userId, spotLocation)
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg)
        }catch (err){
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    });

    router.post(routeMappings.CANCEL_PAYMENT, async (req, res)=>{
        try{
            let {eventName, userId, spotLocation} = req.body
            await paymentService.cancelPayment(eventName, userId, spotLocation)
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg)
        }catch (err){
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    return router

}