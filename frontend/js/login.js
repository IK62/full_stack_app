const { default: axios } = require("axios")
const submit = document.querySelector("#submit")
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input")
let isValid = true
const body = {}

/* find if form is filled or not */
function toggleSubmit(){
  inputs.forEach((e) => {
    if(isValid === true){
      if(e.value !== ""){
        isValid = true
      }else{
        isValid = false
      }
    }
  })
  if(isValid !== false){
    submit.toggleAttribute("disabled", false)
  }
  if(isValid === false){
    submit.toggleAttribute("disabled", true)
  }
  isValid = true
}

/* listen to change on input to launch toggleSubmit */
inputs.forEach((e) => {
  e.addEventListener('change', () => {
    toggleSubmit()
  })
})

/* listen to submit and execute code */
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  findInput(e.target.elements)
  const error = document.querySelector('.error')
  const username = document.querySelector('#username')
  try {
    const getUser = await axios
      .get(`https://splendid-leggings-pig.cyclic.app/api/users/`, {headers: {username: body.username, password: body.password}})
    console.log(getUser)
    const {data, data: {token}} = getUser
    localStorage.setItem("userToken", token)
    userError(data, error, username)
    if(data.status === "200"){
      window.location.pathname = '/index.html'
    }
  } catch (err) {
    if (err.response.data.msg && err.response.data.msg === 'Authentification failed'){
      userError('Invalid username', error, username)
    }
      console.log(
        ` ${err.response.data.msg}\n`,
        `status code: ${err.response.status}`
      )
  }
})

function userError(data, error, child){
  if(error != null){
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