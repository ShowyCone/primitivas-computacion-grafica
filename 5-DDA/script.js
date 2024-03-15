import Drawing from '../graphics.js'

const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')
const randomBtn = document.getElementById('randomBtn')
const canvas = document.getElementById('myCanvas')
const canvasHeight = canvas.height
const canvasWidth = canvas.width
const ctx = canvas.getContext('2d')
const coords0 = {
  x: document.getElementById('x0'),
  y: document.getElementById('y0'),
}
const coords1 = {
  x: document.getElementById('x1'),
  y: document.getElementById('y1'),
}

const drawing = new Drawing(ctx)

drawBtn.addEventListener('click', () => {
  const x0 = parseInt(coords0.x.value)
  const y0 = parseInt(coords0.y.value)
  const x1 = parseInt(coords1.x.value)
  const y1 = parseInt(coords1.y.value)

  drawing.drawDDALine(x0, y0, x1, y1)
})

clearBtn.addEventListener('click', () => {
  drawing.clearCanvas(canvasWidth, canvasHeight)
})

randomBtn.addEventListener('click', () => {
  drawing.drawDDALine(
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501),
    Math.floor(Math.random() * 501)
  )
})
