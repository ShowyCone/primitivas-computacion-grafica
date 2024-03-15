import Drawing from '../graphics.js'

const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')
const randomBtn = document.getElementById('randomBtn')
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
  const radiusN = parseInt(radius.value)

  drawing.drawCircle(x, y, radiusN)
})

clearBtn.addEventListener('click', () => {
  drawing.clearCanvas(canvasWidth, canvasHeight)
})

randomBtn.addEventListener('click', () => {
  drawing.drawCircle(
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 251)
  )
})
