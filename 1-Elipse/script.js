const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 400
canvas.height = 400

const defaultData = {
  radioX: 120,
  radioY: 50,
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

document.getElementById('xRange').addEventListener('input', (event) => {
  drawEllipse(undefined, undefined, event.target.value)
})

document.getElementById('yRange').addEventListener('input', (event) => {
  drawEllipse(undefined, undefined, undefined, event.target.value)
})

drawEllipse(undefined, undefined, undefined, undefined)

function drawEllipse(
  centerX = canvas.width / 2,
  centerY = canvas.height / 2,
  width = defaultData.radioX,
  height = defaultData.radioY
) {
  clearCanvas()
  defaultData.radioX = width
  defaultData.radioY = height
  ctx.beginPath()

  ctx.moveTo(centerX, centerY - height / 2)

  ctx.bezierCurveTo(
    centerX + width / 2,
    centerY - height / 2,
    centerX + width / 2,
    centerY + height / 2,
    centerX,
    centerY + height / 2
  )

  ctx.bezierCurveTo(
    centerX - width / 2,
    centerY + height / 2,
    centerX - width / 2,
    centerY - height / 2,
    centerX,
    centerY - height / 2
  )

  ctx.fillStyle = 'blue'
  ctx.fill()
  ctx.strokeStyle = 'black'
  ctx.stroke()

  const ellipseInfo = getEllipseInfo(width, height)
  const bezierInfo = getBezierInfo(centerX, centerY, width, height)
  const bezierFormula = getBezierFormula(bezierInfo)

  setAllInfo(ellipseInfo, bezierInfo, bezierFormula)
}

function getEllipseInfo(radioX, radioY) {
  return {
    radioX,
    radioY,
    area: (Math.PI * radioX * radioY).toFixed(4),
    circumference: (
      2 *
      Math.PI *
      Math.sqrt((radioX ** 2 + radioY ** 2) / 2)
    ).toFixed(4),
  }
}

function getBezierInfo(centerX, centerY, width, height) {
  const controlPointX = centerX + width / 2
  const controlPointY = centerY + height / 2

  return {
    controlPointX,
    controlPointY,
    startPoint: { x: centerX, y: centerY - height / 2 },
    endPoint: { x: centerX, y: centerY + height / 2 },
  }
}

function getBezierFormula(bezierInfo) {
  const { startPoint, controlPointX, controlPointY, endPoint } = bezierInfo

  return `B(t) = (1 - t)^3 * (${startPoint.x}, ${startPoint.y}) + 3t(1 - t)^2 * (${controlPointX}, ${controlPointY}) + 3t^2(1 - t) * (${controlPointX}, ${controlPointY}) + t^3 * (${endPoint.x}, ${endPoint.y})`
}

function setAllInfo(ellipseInfo, bezierInfo, bezierData) {
  const allEllipseToSet = document.querySelectorAll('.ellipse-info')
  const allBezierToSet = document.querySelectorAll('.bezier-info')
  const bezierToData = document.querySelector('.bezier-data')

  let ellipseInfoInArr = [
    ellipseInfo.area,
    ellipseInfo.circumference,
    ellipseInfo.radioX,
    ellipseInfo.radioY,
  ]

  let bezierInfoInArr = [bezierInfo.controlPointX, bezierInfo.controlPointY]

  allEllipseToSet.forEach((ellipseToSet, index) => {
    ellipseToSet.innerHTML = ellipseInfoInArr[index]
  })

  allBezierToSet.forEach((bezierToSet, index) => {
    bezierToSet.innerHTML = bezierInfoInArr[index]
  })

  bezierToData.innerHTML = bezierData
}
