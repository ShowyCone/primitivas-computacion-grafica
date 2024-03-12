var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
var controlPoints = []
var draggingPointId = null
var mode = 'add' // Modo inicial es agregar punto
var infoDiv = document.getElementById('info')
const infoDivFormula = document.getElementById('info-formula')

document.getElementById('toggleMode').addEventListener('click', function () {
  mode = mode === 'add' ? 'delete' : 'add'
  this.textContent = mode === 'add' ? 'Agregar Punto' : 'Eliminar Punto'
})

canvas.addEventListener('mousedown', function (e) {
  var mousePos = getMousePos(canvas, e)
  if (mode === 'add') {
    var existingPoint = controlPoints.findIndex((p) => isNear(mousePos, p))
    if (existingPoint === -1) {
      controlPoints.push(mousePos)
      drawCurve()
    } else {
      draggingPointId = existingPoint
    }
  } else if (mode === 'delete') {
    var pointToDelete = controlPoints.findIndex((p) => isNear(mousePos, p))
    if (pointToDelete !== -1) {
      controlPoints.splice(pointToDelete, 1)
      drawCurve()
    }
  }
})

canvas.addEventListener('mousemove', function (e) {
  var mousePos = getMousePos(canvas, e)
  if (draggingPointId !== null) {
    controlPoints[draggingPointId] = mousePos
    drawCurve()
  } else {
    canvas.style.cursor = controlPoints.some((p) => isNear(mousePos, p))
      ? 'pointer'
      : 'default'
  }
})

canvas.addEventListener('mouseup', function (e) {
  draggingPointId = null
})

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
}

function isNear(point1, point2) {
  var dx = point1.x - point2.x
  var dy = point1.y - point2.y
  return dx * dx + dy * dy < 100
}

function drawCurve() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (controlPoints.length > 1) {
    ctx.beginPath()
    ctx.moveTo(controlPoints[0].x, controlPoints[0].y)
    for (var i = 1; i < controlPoints.length - 2; i += 3) {
      ctx.bezierCurveTo(
        controlPoints[i].x,
        controlPoints[i].y,
        controlPoints[i + 1].x,
        controlPoints[i + 1].y,
        controlPoints[i + 2].x,
        controlPoints[i + 2].y
      )
    }
    ctx.stroke()
  }
  controlPoints.forEach(function (point) {
    ctx.beginPath()
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
    ctx.fill()
  })
  updateInfo()
}

function updateInfo() {
  var length = calculateBezierLength(controlPoints)
  infoDiv.innerHTML =
    'Longitud aproximada de la curva: ' + length.toFixed(2) + '<br>'
  infoDiv.innerHTML += 'Puntos de control: ' + controlPoints.length + '<br>'
  infoDivFormula.innerHTML =
    'Fórmula de la curva: ' + getBezierFormula(controlPoints)
}

function calculateBezierLength(points) {
  var length = 0
  for (var i = 0; i < points.length - 1; i++) {
    var dx = points[i + 1].x - points[i].x
    var dy = points[i + 1].y - points[i].y
    length += Math.sqrt(dx * dx + dy * dy)
  }
  return length
}

function getBezierFormula(points) {
  if (points.length < 4)
    return 'No hay suficientes puntos para formar una curva de Bézier.'
  var formula = 'B(t) = '
  for (var i = 0; i < points.length; i++) {
    if (i > 0) formula += ' + '
    formula +=
      '(' +
      points[i].x +
      ', ' +
      points[i].y +
      ') * B' +
      points.length +
      ',' +
      i +
      '(t)'
  }
  return formula
}

drawCurve()
