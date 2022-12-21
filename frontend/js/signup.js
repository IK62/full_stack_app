const {default: axios} = require("axios")
const {default: jwtDecode} = require('jwt-decode')
const form = document.querySelector('form')
const submit = document.querySelector("#submit")
const inputs = document.querySelectorAll('input')
let isValid = true
let body = {}

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
form.addEventListener('submit',async (e) => {
  e.preventDefault()
  findInput(e.target.elements)
  console.log(body)
  try {
    const postUser = await axios
      .post("https://splendid-leggings-pig.cyclic.app/api/users", body)
    console.log(postUser)
    const token = postUser.data.data
    localStorage.setItem("userToken", token)
    const decodedUser = {ok: true,user: jwtDecode(token)}
    console.log(decodedUser)
  } catch (err) {
    if(err.response.data.msg){
      return console.log(err.response.data.msg)
    }
    console.log(err)
  }
})

/* add all input field to body */
function findInput(elements) {
  let i = 0
  Object.entries(elements).forEach(([key, values]) => {
    const name = values.name
    const value = values.value
    i++
    if(i < elements.length){
      body[name] = value
    }
  })
}