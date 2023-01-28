const config = {
    DATABASE_URL: 'mongodb://mongo:27017/payment',
    SERVER_PORT: 8082,
    BOOKING_SERVICE_HOST: 'http://booking-service:8081',
    BOOKING_APPROVEMENT_PATH: '/event/:name/reservation/approve'
}

module.exports = config;