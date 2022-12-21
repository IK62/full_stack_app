const form = document.querySelector("form")
const plus = document.querySelector(".plus")

plus.addEventListener("click", (e) => {
  e.preventDefault()
  const isInput = document.querySelector(".input-div")

  if (!isInput) {
    const div = document.createElement("div")
    div.setAttribute("class", "input-div")

    const inputName = document.createElement("input")
    inputName.setAttribute("class", "profil-input inputName")
    inputName.setAttribute("placeholder", "name")

    const inputProperty = document.createElement("input")
    inputProperty.setAttribute("class", "profil-input inputProperty")
    inputProperty.setAttribute("placeholder", "value")

    div.appendChild(inputName)
    div.appendChild(inputProperty)

    form.insertBefore(div, plus)
    form.addEventListener("keydown", (e) => {
      const isInputName = document.querySelector(".inputName")
      const isInputProperty = document.querySelector(".inputProperty")

      if (e.key === "Enter") {
        if (isInputName.value !== "" && isInputProperty.value !== "") {
          const inputString = `{"${isInputName.value}":"${isInputProperty.value}"}`
          console.log(JSON.parse(inputString))
        } else {
          console.log("fill the 2 field")
        }
      }
    })
  }
})
