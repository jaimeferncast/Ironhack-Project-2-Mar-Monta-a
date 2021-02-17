const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

module.exports = app => {
    app.use(logger('dev'))
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
    app.use(cookieParser())
}