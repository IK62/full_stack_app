const { default: axios } = require("axios")
const { default: jwtDecode } = require("jwt-decode")
const form = document.querySelector("form")
const submit = document.querySelector("#submit")
const inputs = document.querySelectorAll("input")
let isValid = true
let body = {}

/* find if form is filled or not */
function toggleSubmit() {
  inputs.forEach((e) => {
    if (isValid === true) {
      if (e.value !== "") {
        isValid = true
      } else {
        isValid = false
      }
    }
  })
  if (isValid !== false) {
    submit.toggleAttribute("disabled", false)
  }
  if (isValid === false) {
    submit.toggleAttribute("disabled", true)
  }
  isValid = true
}

/* listen to change on input to launch toggleSubmit */
inputs.forEach((e) => {
  e.addEventListener("change", () => {
    toggleSubmit()
  })
})

/* listen to submit and execute code */
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  findInput(e.target.elements)
  const username = document.querySelector("#username")
  const error = document.querySelector(".error")
  try {
    const postUser = await axios.post(
      "https://splendid-leggings-pig.cyclic.app/api/users",
      body
    )
    console.log(postUser)
    const token = postUser.data.data
    localStorage.setItem("userToken", token)
    const decodedUser = { ok: true, user: jwtDecode(token) }
    console.log(decodedUser)
  } catch (err) {
    console.log(err)
    if (err.response.data.msg.details) {
      return userError(err.response.data.msg.details, error, username)
    }
    if (err.response.data.msg) {
      return userError(err.response.data.msg, error, username)
    }
  }
})

function userError(data, error, child) {
  if (error != null) {
    error.remove()
  }
  const userError = document.createElement("h3")
  userError.setAttribute("class", "error")
  userError.textContent = `${data}`
  form.insertBefore(userError, child)
}

/* add all input field to body */
function findInput(elements) {
  let i = 0
  Object.entries(elements).forEach(([key, values]) => {
    const name = values.name
    const value = values.value
    i++
    if (i < elements.length) {
      body[name] = value
    }
  })
}
