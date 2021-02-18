module.exports = app => {
    app.locals.title = 'MarMont'
    app.locals.googleAPI = process.env.MAPSKEY
}