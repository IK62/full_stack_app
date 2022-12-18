const Joi = require("joi")

module.exports = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .max(20)
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .max(45)
      .min(10)
      .required(),
    password: Joi.string()
      .required()
      .max(23)
      .min(5)
      .pattern(new RegExp(/@/)),
    confirmationPassword: Joi.string()
      .required()
      .min(5)
      .max(23)
      .pattern(new RegExp(/@/)),
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