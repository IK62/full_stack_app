const Joi = require("joi")

module.exports = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .max(45)
      .min(10)
      .required(),
    password: Joi.string()
      .max(23)
      .min(5)
      .pattern(new RegExp(/@/)).required(),
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