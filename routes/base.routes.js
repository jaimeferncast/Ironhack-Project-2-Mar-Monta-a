const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {

    if (req.user) {
        let avatar = req.user.avatar
        return res.render('index', { avatar })
    } else { res.render('index') }
})

module.exports = router