import Drawing from '../graphics.js'

const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')
const randomBtn = document.getElementById('randomBtn')
const canvas = document.getElementById('myCanvas')
const canvasHeight = canvas.height
const canvasWidth = canvas.width
const ctx = canvas.getContext('2d')
const coords = {
  x1: document.getElementById('x1'),
  y1: document.getElementById('y1'),
  x2: document.getElementById('x2'),
  y2: document.getElementById('y2'),
  x3: document.getElementById('x3'),
  y3: document.getElementById('y3'),
}

const drawing = new Drawing(ctx)

drawBtn.addEventListener('click', () => {
  const x1 = parseInt(coords.x1.value)
  const y1 = parseInt(coords.y1.value)
  const x2 = parseInt(coords.x2.value)
  const y2 = parseInt(coords.y2.value)
  const x3 = parseInt(coords.x3.value)
  const y3 = parseInt(coords.y3.value)

  drawing.drawBezierCurve(x1, y1, x2, y2, x3, y3)
})

clearBtn.addEventListener('click', () => {
  drawing.clearCanvas(canvasWidth, canvasHeight)
})

randomBtn.addEventListener('click', () => {
  drawing.drawBezierCurve(
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501)
  )
})
