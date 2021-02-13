module.exports = app => {

    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/mi-perfil', require('./user.routes.js'))
    app.use('/lugares', require('./places.routes.js'))
}