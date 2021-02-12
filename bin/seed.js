require('dotenv').config()

const mongoose = require('mongoose')
const User = require('./../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })

const users = [{
    username: 'superMarMont',
    email: 'supermarmont@marmont.com',
    name: 'Mar y Montaña Admin',
    password: bcrypt.hashSync('marmont', salt),
    role: 'ADMIN'
},
{
    username: 'marMont',
    email: 'marmont@marmont.com',
    name: 'Mar y Montaña User',
    password: bcrypt.hashSync('marmont', salt),
    role: 'USER'
}
]

User
    .create(users)
    .then(response => {
        console.log(`Se han creado ${response.length} usuarios en la BBDD`)
        mongoose.connection.close()
    })
    .catch(err => console.log(`Se ha producido un error:`, err))