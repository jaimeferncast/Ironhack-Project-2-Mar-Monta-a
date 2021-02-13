module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", { errorMsg: 'Necesitas acceder para entrar en esta página' }),
}