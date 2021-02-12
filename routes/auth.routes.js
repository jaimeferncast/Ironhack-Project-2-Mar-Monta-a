const express = require('express')
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get("/acceso", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/acceso", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))

router.get("/registro", (req, res) => res.render("auth/signup"))

router.post("/registro", (req, res, next) => {

    const { username, name, password, profileImg, description, facebookId } = req.body

    if (username === "" || password === "" || name === "") {
        res.render("auth/signup", { errorMsg: "Fill the required fields" })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render("auth/signup", { errorMsg: "Username already exists" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, name, password: hashPass, profileImg, description, facebookId })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", { errorMsg: "Server error" }))
        })
        .catch(error => next(new Error(error)))
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router