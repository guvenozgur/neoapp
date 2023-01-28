"use strict"

const {routeMappings} = require('../config/mappings');
const RESTStatus = require('../config/rest-status-codes');
const router = require('express').Router();
const bookingService = require('../service/booking-service')();

module.exports = ()=>{

    router.post(routeMappings.CREATE_EVENT, async (req, res)=>{
        try{
            let {name, capacity} = req.body
            await bookingService.createEvent(name, capacity)
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg)
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.get(routeMappings.GET_EVENTS, async (req, res)=>{
        try{
            let events = await bookingService.getEventDetails()
            res.status(RESTStatus.OK.code).json({events})
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.get(routeMappings.GET_EVENT_BY_NAME, async (req, res)=>{
        try{
            let event = await bookingService.getEventDetailByName(req.params.name)
            res.status(RESTStatus.OK.code).json({event})
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.get(routeMappings.GET_AVAILABLE_SPOTS, async (req, res)=>{
        try{
            let availableSportsByEvent = await bookingService.getAvailableSpots(req.params.name)
            res.status(RESTStatus.OK.code).json({availableSportsByEvent})
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.post(routeMappings.CREATE_RESERVATION, async (req, res)=>{
        try{
            let eventName = req.params.name;
            let {spotLocation, userId} = req.body;
            await bookingService.createReservation(eventName, spotLocation, userId)
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg)

        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.post(routeMappings.APPROVE_RESERVATION, async (req, res)=>{
        try{
            let eventName = req.params.name;
            let {spotLocation, userId} = req.body;
            await bookingService.approveReservation(eventName, spotLocation, userId)
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg)

        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.post(routeMappings.CANCEL_RESERVATION, async (req, res)=>{
        try{
            let eventName = req.params.name;
            let {spotLocation, userId} = req.body;
            await bookingService.cancelReservation(eventName, spotLocation, userId)
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg)

        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })

    router.get(routeMappings.GET_ALL_RESERVATIONS, async (req, res)=>{
        try{
            let reservations = await bookingService.getReservations()
            res.status(RESTStatus.OK.code).json({reservations})
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg)
        }
    })


    return router;

}