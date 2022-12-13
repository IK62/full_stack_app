const Joi = require("joi")

module.exports = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
        .max(15)
        .min(2)
        .required(),
    password: Joi.string()
        .max(30)
        .min(5)
        .required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).send({
      ok: false,
      msg: `Bad request : ${error.details[0].message}`,
    })
  }

  next()
}