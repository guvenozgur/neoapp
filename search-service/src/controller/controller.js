"use strict"

const {routeMappings} = require('../config/mappings');
const RESTStatus = require('../config/rest-response-status');
const router = require('express').Router();
const eventService = require('../service/event-service')();
const EventStatus = require('../config/event-status');
const Category = require('../config/category');
const rest = require('../helper/rest');
const config = require('../config/config');

module.exports = ()=>{

    router.get(routeMappings.EVENTS, async (req, res)=>{
        try{
            let events = await eventService.getAllEvents();
            res.status(RESTStatus.OK.code).json({events})
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg);
        }
    })

    router.post(routeMappings.CREATE_EVENT, async (req, res)=>{
        try{
            let {name, category, status} = req.body;
            // TODO: validation for category and status
            await eventService.createEvent(name, Category[category].id, EventStatus[status].id)
            res.status(RESTStatus.OK.code).send()
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg);
        }
    })

    router.post(routeMappings.ACTIVATE_EVENT, async (req, res)=>{
        try{
            let {name, capacity} = req.body;
            await eventService.activateEvent(name)
            const data = {name, capacity}
            await rest().post(config.BOOKING_SERVICE_URL+config.ACTIVATE_BOOKING_PATH, data)
            res.status(RESTStatus.OK.code).send()
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg);
        }
    })

    router.get(routeMappings.HEALTHZ, async (req, res)=>{
        try{
            res.status(RESTStatus.OK.code).send(RESTStatus.OK.msg);
        }catch(err) {
            res.status(RESTStatus.INTERNAL_SERVER_ERROR.code).send(RESTStatus.INTERNAL_SERVER_ERROR.msg);
        }
    })

    return router;

}