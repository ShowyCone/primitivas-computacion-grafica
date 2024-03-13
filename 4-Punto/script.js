function dibujarPunto() {
    let x = parseInt(document.getElementById('x').value);
    let y = parseInt(document.getElementById('y').value);
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2, true);
    ctx.fill();
}

function limpiar() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function puntoAleatorio() {
    let x = Math.floor(Math.random() * 500);
    let y = Math.floor(Math.random() * 500);
    document.getElementById('x').value = x;
    document.getElementById('y').value = y;
    dibujarPunto();
}

function validar() {
    let x = document.getElementById('x').value;
    let y = document.getElementById('y').value;
    let btnDibujar = document.getElementById('btnDibujar');

    btnDibujar.disabled = !(x && y && x >= 0 && x <= 500 && y >= 0 && y <= 500);
}