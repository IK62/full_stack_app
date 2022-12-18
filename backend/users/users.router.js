const express = require('express')
const { signup, login, profil } = require('./users.controller')
const validateLoginPayLoad = require('../middlewares/validateLoginPayload')
const validateSignupPayLoad = require('../middlewares/validateSignupPayload')

const router = express.Router()

router.route('/profil').get(profil)
router.route('/users').get(validateLoginPayLoad, login)
router.route('/users').post(validateSignupPayLoad, signup)
router.route('/users').put()
router.route('/users').delete()

module.exports = router