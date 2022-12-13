const User = require('./users.model')
const jwt = require('jsonwebtoken')
const _ = require('underscore')
const bcrypt = require('bcrypt')

module.exports = {
    signup: async (req, res) => {
        const { email, username, password, confirmationPassword } = req.body

        let isEmailExist = await User.findOne({
          email,
        })

        let isUsernameExist = await User.findOne({
          username,
        })

        if (isEmailExist) {
          return res.status(400).send({
            ok: false,
            msg: {
              error: "Email already exist",
              details: "Provide another email",
            },
          })
        }

        if (isUsernameExist) {
          return res.status(400).send({
            ok: false,
            msg: {
              error: "username already exist",
              details: "Provide another username",
            },
          })
        }

        if (password != confirmationPassword) {
          return res.status(400).send({
            ok: false,
            msg: "password mismatch",
          })
        }

        const salt = await bcrypt.genSalt(8)

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        let user = new User(req.body)

        user.password = hashedPassword

        try {
          await user.save()
        } catch (err) {
          console.log(err)
        }

        const token = jwt.sign(
          _.pick(user, ("_id", "firstName")),
          process.env.PRIVATE_KEY
        )

        res.send({
          ok: true,
          data: token,
        })
    },
    login: async (req, res) => {
        try {
          const user = await User.findOne({
            email: req.body.email,
          })

          if (!user) {
            return res
              .status(401)
              .send({ ok: false, msg: "Authentification failed" })
          }

          const isCorrectPassword = await bcrypt.compare(
            req.body.password,
            user.password
          )

          if (!isCorrectPassword) {
            return res.send("Wrong password")
          }

          const token = jwt.sign(
            {
              _id: user._id,
              firstName: user.firstName,
            },
            process.env.PRIVATE_KEY
          )

          res.send({
            ok: true,
            token,
          })
        } catch (err) {
          return res.send(err)
        }
    },
    profil: async (req, res) => {
        const token = req.headers["x-auth-token"]

        if (!token) {
          return res.send(400).send({ ok: false, msg: "Bad request" })
        }

        const isValid = jwt.sign(token, process.env.PRIVATE_KEY)

        if (!isValid) {
          return res.status(401).send({ ok: false, msg: "Not authorized" })
        }

        const profil = jwt.decode(token)

        res.send({
          ok: true,
          data: {
            profil,
          },
        })
    },
    deletor: async (req, res) => {
        try {
            const user = await User.findOneAndDelete({username: req.body.username})

            res.send(user)
        } catch (err) {
            res.send(err)
        }
    }
}