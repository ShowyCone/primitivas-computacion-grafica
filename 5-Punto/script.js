function dibujarLinea() {
    let x0 = parseInt(document.getElementById('x0').value);
    let y0 = parseInt(document.getElementById('y0').value);
    let x1 = parseInt(document.getElementById('x1').value);
    let y1 = parseInt(document.getElementById('y1').value);
    let dx = x1 - x0;
    let dy = y1 - y0;
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let incrementoX = dx / steps;
    let incrementoY = dy / steps;
    let x = x0;
    let y = y0;
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    for (let i = 0; i <= steps; i++) {
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
        x += incrementoX;
        y += incrementoY;
    }
}

function limpiar() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function lineaAleatoria() {
    let x0 = Math.floor(Math.random() * 500);
    let y0 = Math.floor(Math.random() * 500);
    let x1 = Math.floor(Math.random() * 500);
    let y1 = Math.floor(Math.random() * 500);
    document.getElementById('x0').value = x0;
    document.getElementById('y0').value = y0;
    document.getElementById('x1').value = x1;
    document.getElementById('y1').value = y1;
    dibujarLinea();
}

function validar() {
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