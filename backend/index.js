const express = require('express')
const app = express()
const connectionDB = require('./db/connection')
const router = require('./users/users.router')
const User = require('./users/users.model')

require('dotenv').config()

connectionDB()
init()

function init(){

    app.use(express.json())
    app.use('/api', router)

    app.route('/').get(async (req, res) => {
        const users = await User.find().exec()

        res.send(users)
    })

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`connected on port ${PORT}`))
}