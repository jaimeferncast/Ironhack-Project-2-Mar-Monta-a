const express = require('express')
const router = express.Router()

router.get('/', (req, res) => req.user ? res.render('index', { user: req.user }) : res.render('index'))

module.exports = router