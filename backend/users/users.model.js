const mongoose = require("mongoose")

module.exports = mongoose.model(
  "user",
  mongoose.Schema({
    username: {
      type: String,
      max: 15,
      min: 2,
      required: true,
    },
    firstName: {
      type: String,
      max: 20,
      min: 4,
      required: true,
    },
    secondName: {
      type: String,
      max: 20,
      min: 4,
      required: true,
    },
    email: {
      type: String,
      min: 10,
      max: 50,
      required: true,
    },
    password: {
      type: String,
      min: 5,
      max: 30,
      required: true,
    },
  })
)
