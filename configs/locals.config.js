module.exports = app => {
    app.locals.title = 'MarMont_'
    app.locals.googleAPI = process.env.MAPSKEY
    app.locals.stormglassAPI = process.env.APIKEY
}