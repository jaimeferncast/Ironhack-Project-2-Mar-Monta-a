const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get("/acceso", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/acceso", passport.authenticate("local", {
    successRedirect: "/mi-perfil/favoritos",
    failureRedirect: "/acceso",
    failureFlash: true,
    passReqToCallback: true
}))

router.get("/registro", (req, res) => res.render("auth/signup"))

router.post("/registro", (req, res, next) => {

    const { username, name, email, password } = req.body

    if (username === "" || password === "" || email === "" || name === "") {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (user) {
                res.render("auth/signup", { errorMsg: "Email ya registrado" })
                return
            }

            User
                .findOne({ username })
                .then(user => {

                    if (user) {
                        res.render("auth/signup", { errorMsg: "Usuario ya registrado" })
                        return
                    }

                    const salt = bcrypt.genSaltSync(bcryptSalt)
                    const hashPass = bcrypt.hashSync(password, salt)

                    User
                        .create({ username, name, email, password: hashPass })
                        .then(() => res.redirect("/"))
                        .catch(() => res.render("auth/signup", { errorMsg: "Server error" }))
                })
                .catch(error => next(new Error(error)))
        })
})

router.get("/cerrar-sesion", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router