const express = require("express")
const { signup, login, profil, deletor } = require("./users.controller")
const validateLoginPayload = require("../middlewares/validateLoginPayload")
const validateSignupPayload = require("../middlewares/validateSignupPayload")

const router = express.Router()

router.route("/profil").get(profil)
router.route("/users").get(login)
router.route("/users").post(validateSignupPayload, signup)
router.route("/users").delete(validateLoginPayload, deletor)

module.exports = router
