module.exports = app => {

    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/area-personal', require('./user.routes.js'))
    app.use('/lugares-comunes', require('./places.routes.js'))
}