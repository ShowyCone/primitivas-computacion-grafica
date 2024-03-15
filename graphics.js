/**
 * Dibuja una línea utilizando el algoritmo de Bresenham en un contexto dado.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} x0 - La coordenada x inicial.
 * @param {number} y0 - La coordenada y inicial.
 * @param {number} x1 - La coordenada x final.
 * @param {number} y1 - La coordenada y final.
 */
function drawBresenhamLine(ctx, x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0)
  let dy = Math.abs(y1 - y0)
  let sx = x0 < x1 ? 1 : -1
  let sy = y0 < y1 ? 1 : -1
  let err = dx - dy

  while (true) {
    ctx.fillStyle = "black"
    ctx.fillRect(x0, y0, 1, 1)

    if (x0 === x1 && y0 === y1) break
    let e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x0 += sx
    }
    if (e2 < dx) {
      err += dx
      y0 += sy
    }
  }
}

/**
 * Dibuja un punto en un contexto dado.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} x - La coordenada x del punto.
 * @param {number} y - La coordenada y del punto.
 */
function drawPoint(ctx, x, y) {
  ctx.fillStyle = "black"
  ctx.beginPath()
  ctx.arc(x, y, 1, 0, Math.PI * 2, true)
  ctx.fill()
}

/**
 * Dibuja una línea utilizando el algoritmo DDA en un contexto dado.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} x0 - La coordenada x inicial.
 * @param {number} y0 - La coordenada y inicial.
 * @param {number} x1 - La coordenada x final.
 * @param {number} y1 - La coordenada y final.
 */
function drawDDALine(ctx, x0, y0, x1, y1) {
  let dx = x1 - x0
  let dy = y1 - y0
  let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)
  let incrementoX = dx / steps
  let incrementoY = dy / steps
  let x = x0
  let y = y0
  ctx.fillStyle = "black"
  for (let i = 0; i <= steps; i++) {
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1)
    x += incrementoX
    y += incrementoY
  }
}

/**
 * Rellena un polígono utilizando el algoritmo de relleno de líneas de exploración.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {Array} vertices - Los vértices del polígono en el formato [[x1, y1], [x2, y2], ..., [xn, yn]].
 */
function fillPolygon(ctx, vertices) {
  let minY = vertices[0][1]
  let maxY = vertices[0][1]
  for (let i = 1; i < vertices.length; i++) {
    if (vertices[i][1] < minY) minY = vertices[i][1]
    if (vertices[i][1] > maxY) maxY = vertices[i][1]
  }

  for (let y = minY; y <= maxY; y++) {
    let points = []

    for (let i = 0; i < vertices.length; i++) {
      let j = (i + 1) % vertices.length
      let x1 = vertices[i][0],
        y1 = vertices[i][1]
      let x2 = vertices[j][0],
        y2 = vertices[j][1]
      if ((y1 < y && y2 >= y) || (y2 < y && y1 >= y)) {
        let x = x1 + ((y - y1) / (y2 - y1)) * (x2 - x1)
        points.push(x)
      }
    }

    points.sort((a, b) => a - b)
    for (let i = 0; i < points.length; i += 2) {
      ctx.beginPath()
      ctx.moveTo(points[i], y)
      ctx.lineTo(points[i + 1], y)
      ctx.stroke()
    }
  }
}

/**
 * Dibuja un polígono regular basado en el número de lados y el radio.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} centerX - La coordenada x del centro del polígono.
 * @param {number} centerY - La coordenada y del centro del polígono.
 * @param {number} sides - El número de lados del polígono.
 * @param {number} radius - El radio del polígono.
 */
function drawRegularPolygon(ctx, centerX, centerY, sides, radius) {
  ctx.beginPath()
  let angle = (Math.PI * 2) / sides
  for (let i = 0; i <= sides; i++) {
    let x = centerX + radius * Math.cos(i * angle)
    let y = centerY + radius * Math.sin(i * angle)
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.closePath()
  ctx.stroke()
}

/**
 * Dibuja un círculo con un radio y centro dados.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} centerX - La coordenada x del centro del círculo.
 * @param {number} centerY - La coordenada y del centro del círculo.
 * @param {number} radius - El radio del círculo.
 */
function drawCircle(ctx, centerX, centerY, radius) {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * Dibuja un círculo con un radio y centro dados.
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} centerX - La coordenada x del centro del círculo.
 * @param {number} centerY - La coordenada y del centro del círculo.
 * @param {number} radiusX - El radio x de la elipse.
 * @param {number} radiusY - El radio y de la elipse.
 */
function drawEllipse(ctx, centerX, centerY, radiusX, radiusY) {
  ctx.beginPath()
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
  ctx.stroke()
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
 * @param {number} canvasWidth - Ancho del canvas
 * @param {number} canvasHeight - Alto del canvas
 */
function clearCanvas(ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

module.exports = {
  drawBresenhamLine,
  drawPoint,
  drawDDALine,
  fillPolygon,
  drawRegularPolygon,
  drawCircle,
  drawEllipse,
  clearCanvas,
}
