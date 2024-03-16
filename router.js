const router = () => {
  // Obtener la ruta del hash
  const path = window.location.hash.substring(2) // Ignoramos los primeros dos caracteres "#/"
  const content = document.querySelector('main')

  // Ruta del archivo HTML correspondiente
  const filePath = path ? `./${path}/index.html` : './README.md'

  console.log('filePath: ', filePath)
  console.log('path: ', path)
  // Cargar el contenido de acuerdo a la ruta
  fetch(filePath)
    .then((response) => {
      if (response.ok) {
        return response.text()
      }
      throw new Error('Page not found')
    })
    .then((html) => {
      content.innerHTML = html
    })
    .catch((error) => {
      content.innerHTML = `<h1>Error</h1><p>${error.message}</p>`
    })
}

window.addEventListener('hashchange', router)
window.addEventListener('DOMContentLoaded', router)
