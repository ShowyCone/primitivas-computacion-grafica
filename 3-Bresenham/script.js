function bresenhamLine(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while(true) {
        setPixel(x0, y0);

        if ((x0 === x1) && (y0 === y1)) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

function setPixel(x, y) {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 1, 1);
}

function dibujar() {
    let x0 = parseInt(document.getElementById('x0').value);
    let y0 = parseInt(document.getElementById('y0').value);
    let x1 = parseInt(document.getElementById('x1').value);
    let y1 = parseInt(document.getElementById('y1').value);
    bresenhamLine(x0, y0, x1, y1);
}

function limpiar() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function aleatorio() {
    let x0 = Math.floor(Math.random() * 500);
    let y0 = Math.floor(Math.random() * 500);
    let x1 = Math.floor(Math.random() * 500);
    let y1 = Math.floor(Math.random() * 500);
    document.getElementById('x0').value = x0;
    document.getElementById('y0').value = y0;
    document.getElementById('x1').value = x1;
    document.getElementById('y1').value = y1;
    dibujar();
}

function validation() {
    let x0 = document.getElementById('x0').value;
    let y0 = document.getElementById('y0').value;
    let x1 = document.getElementById('x1').value;
    let y1 = document.getElementById('y1').value;
    let btnDibujar = document.getElementById('btnDibujar');

    btnDibujar.disabled = !(x0 && y0 && x1 && y1 &&
                            x0 >= 0 && x0 <= 500 &&
                            y0 >= 0 && y0 <= 500 &&
                            x1 >= 0 && x1 <= 500 &&
                            y1 >= 0 && y1 <= 500);
}