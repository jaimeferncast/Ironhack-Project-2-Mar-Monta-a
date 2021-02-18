const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'supermarmont@gmail.com',
        pass: 'marmont'
    }
})