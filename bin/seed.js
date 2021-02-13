require('dotenv').config()

const mongoose = require('mongoose')
const User = require('./../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect(process.env.DB_REMOTE, { useNewUrlParser: true, useUnifiedTopology: true })

const users = [{
    username: 'superMarMont',
    email: 'supermarmont@gmail.com',
    name: 'Mar y Montaña Admin',
    password: bcrypt.hashSync('marmont', salt),
    role: 'ADMIN',
    favourites: []
},
{
    username: 'marMont',
    email: 'marmont@marmont.com',
    name: 'Mar y Montaña User',
    password: bcrypt.hashSync('marmont', salt),
    role: 'USER',
    favourites: []
}
]

User
    .create(users)
    .then(response => {
        console.log(`Se han creado ${response.length} usuarios en la BBDD`)
        mongoose.connection.close()
    })
    .catch(err => console.log(`Se ha producido un error:`, err))