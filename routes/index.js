module.exports = app => {

    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/area-personal', require('./user.routes.js'))
    app.use('/lugares-comunes', require('./places.routes.js'))
    app.use('/api', require('./api.routes.js'))
    app.use('/map', require('./map.routes.js'))
}