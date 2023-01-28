const config = {
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    REDIS_REQ_TIMEOUT: 5000,
    DATABASE_URL: 'mongodb://mongo:27017/search',
    SERVER_PORT: 8080,
    BOOKING_SERVICE_URL: 'http://booking-service:8081',
    ACTIVATE_BOOKING_PATH: "/event"
}

module.exports = config;