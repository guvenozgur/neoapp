module.exports.routeMappings = {
    CREATE_EVENT: '/event',
    GET_EVENTS: '/event',
    GET_EVENT_BY_NAME: '/event/:name',
    GET_AVAILABLE_SPOTS: '/event/:name/spots',
    CREATE_RESERVATION: '/event/:name/reservation',
    APPROVE_RESERVATION: '/event/:name/reservation/approve',
    CANCEL_RESERVATION: '/event/:name/reservation/cancel',
    GET_ALL_RESERVATIONS: '/reservation'
}
