export default class Drawing {
  /**
   * Constructor de la clase Drawing.
   * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado del canvas.
   */
  constructor(ctx) {
    this.ctx = ctx
    this.lineColor = 'black'
    this.lineWidth = 1
    this.lineStyle = 'solid'
  }

  /**
   * Establece el color de línea.
   * @param {string} color - El color de línea a establecer.
   */
  setLineColor(color) {
    this.lineColor = color
  }

  /**
   * Establece el ancho de línea.
   * @param {number} width - El ancho de línea a establecer.
   */
  setLineWidth(width) {
    this.lineWidth = width
  }

  /**
   * Establece el estilo de línea.
   * @param {string} style - El estilo de línea a establecer.
   */
  setLineStyle(style) {
    this.lineStyle = style
  }

  /**
   * Limpia el contenido del canvas.
   * @param {number} canvasWidth - Ancho del canvas.
   * @param {number} canvasHeight - Alto del canvas.
   */
  clearCanvas(canvasWidth, canvasHeight) {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }

  /**
   * Dibuja una elipse en el contexto del canvas.
   * @param {number} x - La coordenada x del centro de la elipse.
   * @param {number} y - La coordenada y del centro de la elipse.
   * @param {number} radiusX - El radio x de la elipse.
   * @param {number} radiusY - El radio y de la elipse.
   */
  drawEllipse(x, y, radiusX, radiusY) {
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
    this.ctx.stroke()
  }

  /**
   * Dibuja un punto en el contexto del canvas.
   * @param {number} x - La coordenada x del punto.
   * @param {number} y - La coordenada y del punto.
   */
  drawPoint(x, y) {
    this.ctx.fillRect(x, y, 1, 1)
  }

  /**
   * Dibuja un círculo en el contexto del canvas.
   * @param {number} x - La coordenada x del centro del círculo.
   * @param {number} y - La coordenada y del centro del círculo.
   * @param {number} radius - El radio del círculo.
   */
  drawCircle(x, y, radius) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    this.ctx.stroke()
  }

  /**
   * Dibuja una línea utilizando el algoritmo de Bresenham en el contexto del canvas.
   * @param {number} x0 - La coordenada x inicial de la línea.
   * @param {number} y0 - La coordenada y inicial de la línea.
   * @param {number} x1 - La coordenada x final de la línea.
   * @param {number} y1 - La coordenada y final de la línea.
   */
  drawBresenhamLine(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0)
    let dy = Math.abs(y1 - y0)
    let sx = x0 < x1 ? 1 : -1
    let sy = y0 < y1 ? 1 : -1
    let err = dx - dy

    while (true) {
      this.ctx.fillStyle = this.lineColor
      this.ctx.fillRect(x0, y0, 1, 1)

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
   * Dibuja una línea utilizando el algoritmo DDA en el contexto del canvas.
   * @param {number} x0 - La coordenada x inicial de la línea.
   * @param {number} y0 - La coordenada y inicial de la línea.
   * @param {number} x1 - La coordenada x final de la línea.
   * @param {number} y1 - La coordenada y final de la línea.
   */
  drawDDALine(x0, y0, x1, y1) {
    let dx = x1 - x0
    let dy = y1 - y0
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)
    let incrementoX = dx / steps
    let incrementoY = dy / steps
    let x = x0
    let y = y0
    this.ctx.fillStyle = this.lineColor
    for (let i = 0; i <= steps; i++) {
      this.ctx.fillRect(Math.round(x), Math.round(y), 1, 1)
      x += incrementoX
      y += incrementoY
    }
  }

  /**
   * Dibuja un polígono regular en el contexto del canvas.
   * @param {number} centerX - La coordenada x del centro del polígono.
   * @param {number} centerY - La coordenada y del centro del polígono.
   * @param {number} sides - El número de lados del polígono.
   * @param {number} radius - El radio del polígono.
   */
  drawRegularPolygon(centerX, centerY, sides, radius) {
    this.ctx.beginPath()
    const angle = (Math.PI * 2) / sides
    for (let i = 0; i < sides; i++) {
      const x = centerX + radius * Math.cos(i * angle)
      const y = centerY + radius * Math.sin(i * angle)
      if (i === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    }
    this.ctx.closePath()
    this.ctx.stroke()
  }

  /**
   * Rellena una forma cerrada en el contexto del canvas.
   * @param {number} x - La coordenada x de la esquina superior izquierda del área a rellenar.
   * @param {number} y - La coordenada y de la esquina superior izquierda del área a rellenar.
   * @param {number} width - El ancho del área a rellenar.
   * @param {number} height - La altura del área a rellenar.
   */
  fillShape(x, y, width, height) {
    const imageData = this.ctx.getImageData(x, y, width, height)
    const data = imageData.data

    const fillColor = this.ctx.fillStyle
    const fillColorArray = this.hexToRgb(fillColor)

    const isInside = (x, y) => {
      const index = (y - imageData.y) * width * 4 + (x - imageData.x) * 4
      return (
        data[index] === fillColorArray[0] &&
        data[index + 1] === fillColorArray[1] &&
        data[index + 2] === fillColorArray[2]
      )
    }

    const fillHorizontalLine = (x1, x2, y) => {
      for (let x = x1; x <= x2; x++) {
        const index = (y - imageData.y) * width * 4 + (x - imageData.x) * 4
        data[index] = fillColorArray[0]
        data[index + 1] = fillColorArray[1]
        data[index + 2] = fillColorArray[2]
      }
    }

    for (let y = 0; y < height; y++) {
      let inside = false

      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4

        if (isInside(x, y)) {
          inside = !inside
        }

        if (inside) {
          let startX = x
          while (inside && x < width) {
            x++
            inside = isInside(x, y)
          }
          fillHorizontalLine(startX, x - 1, y)
        }
      }
    }

    this.ctx.putImageData(imageData, x, y)
  }
}
