import Drawing from '../graphics.js'

const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')
const randomBtn = document.getElementById('randomBtn')
const fillBtn = document.getElementById('fillBtn')
const sides = document.getElementById('sides')
const radius = document.getElementById('radius')
const canvas = document.getElementById('myCanvas')
const canvasHeight = canvas.height
const canvasWidth = canvas.width
const ctx = canvas.getContext('2d')
const coords = {
  x: document.getElementById('x'),
  y: document.getElementById('y'),
}

const drawing = new Drawing(ctx)

drawBtn.addEventListener('click', () => {
  const x = parseInt(coords.x.value)
  const y = parseInt(coords.y.value)
  const sidesN = parseInt(sides.value)
  const radiusN = parseInt(radius.value)

  drawing.drawRegularPolygon(x, y, sidesN, radiusN)
})

clearBtn.addEventListener('click', () => {
  drawing.clearCanvas(canvasWidth, canvasHeight)
})

randomBtn.addEventListener('click', () => {
  coords.x.value = Math.floor(Math.random() * 501)
  coords.y.value = Math.floor(Math.random() * 501)
  sides.value = Math.floor(Math.random() * 31)
  radius.value = Math.floor(Math.random() * 251)

  const x = parseInt(coords.x.value)
  const y = parseInt(coords.y.value)
  const sidesN = parseInt(sides.value)
  const radiusN = parseInt(radius.value)

  drawing.drawRegularPolygon(x, y, sidesN, radiusN)
})

fillBtn.addEventListener('click', () => {
  const x = parseInt(coords.x.value)
  const y = parseInt(coords.y.value)
  const radiusN = parseInt(radius.value)
  const sidesN = parseInt(sides.value)

  drawing.fillShape(x, y, radiusN, sidesN)
})
