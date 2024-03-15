import Drawing from '../graphics.js'

const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')
const randomBtn = document.getElementById('randomBtn')
const canvas = document.getElementById('myCanvas')
const canvasHeight = canvas.height
const canvasWidth = canvas.width
const ctx = canvas.getContext('2d')
const coords = {
  x: document.getElementById('xCoord'),
  y: document.getElementById('yCoord'),
}
const radius = {
  x: document.getElementById('xRadius'),
  y: document.getElementById('yRadius'),
}

const drawing = new Drawing(ctx)

drawBtn.addEventListener('click', () => {
  drawing.drawEllipse(
    coords.x.value,
    coords.y.value,
    radius.x.value,
    radius.y.value
  )
})

clearBtn.addEventListener('click', () => {
  drawing.clearCanvas(canvasWidth, canvasHeight)
})

randomBtn.addEventListener('click', () => {
  drawing.drawEllipse(
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 251),
    Math.floor(Math.random() * 251)
  )
})
