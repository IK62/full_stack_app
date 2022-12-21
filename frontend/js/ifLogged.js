const signupForm = document.querySelector(".signupForm")
const ul = document.querySelector("ul")
const signup = document.querySelector("#signup")
const login = document.querySelector("#login")
const hi = document.querySelector("#hi")
const profilForm = document.querySelector("#profil-form")
const { default: jwtDecode } = require("jwt-decode")

if (localStorage.userToken) {
  const decodedUser = jwtDecode(localStorage.userToken)

  /* add profil button */
  const profil = document.createElement("li")
  const article = document.createElement("a")
  const contentArticle = document.createTextNode("Profil")
  profil.setAttribute("id", "profil")
  article.setAttribute("href", "profil.html")
  article.appendChild(contentArticle)
  profil.appendChild(article)

  ul.insertBefore(profil, signup)

  /* change login to logout */
  const contentLogout = document.createTextNode("Logout")
  login.removeAttribute("id")
  login.setAttribute("class", "logout")
  const articleContent = login.children[0]
  articleContent.textContent = ""
  articleContent.appendChild(contentLogout)
  articleContent.setAttribute("href", "login.html")
  articleContent.addEventListener("click", () => {
    localStorage.clear()
  })

  /* remove signup button */
  ul.removeChild(signup)

  /* make signup unusable when logged in */
  if (signupForm) {
    const deleteChildren = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
      }
    }
    deleteChildren(signupForm)
    const h2Form = document.createElement("h2")
    h2Form.textContent = "your not allowed to be here"
    signupForm.appendChild(h2Form)
  }

  /* when on home show current user */
  if (hi) {
    hi.textContent = `Hi ${decodedUser.username}`
  }

  if (window.location.pathname === "/login.html") {
    const form = document.querySelector("form")
    const deleteChildren = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
      }
    }
    deleteChildren(form)
    const h2Form = document.createElement("h2")
    h2Form.textContent = "your not allowed to be here"
    form.appendChild(h2Form)
  }

  /* when on profil show user infos */
  if (profilForm) {
    const h2Form = document.querySelector("#h2-form")
    profilForm.removeChild(h2Form)
    const username = document.createElement("h2")
    const firstName = document.createElement("h3")
    const secondName = document.createElement("h3")
    const email = document.createElement("h3")
    const plus = document.createElement("button")
    plus.setAttribute("class", "plus")
    username.textContent = `username: ${decodedUser.username}`
    firstName.textContent = `firstName: ${decodedUser.firstName}`
    secondName.textContent = `secondName: ${decodedUser.secondName}`
    email.textContent = `email: ${decodedUser.email}`
    plus.textContent = "+"

    profilForm.appendChild(username)
    profilForm.appendChild(firstName)
    profilForm.appendChild(secondName)
    profilForm.appendChild(email)
    profilForm.appendChild(plus)
  }
}
