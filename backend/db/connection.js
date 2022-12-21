const mongoose = require("mongoose")

module.exports = async () => {
  try {
    await mongoose.connect(process.env.URL_DB)

    console.log("connected to the users database")
  } catch (err) {
    console.log(err)
  }
}
