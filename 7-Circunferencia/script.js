function dibujarCircunferencia() {
    let centroX = document.getElementById('centroX').value;
    let centroY = document.getElementById('centroY').value;
    let radio = document.getElementById('radio').value;
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
    ctx.stroke();
}

function circunferenciaAleatoria() {
    let maxRadio = 250;
    let radio = Math.random() * maxRadio;
    let centroX = Math.random() * (500 - 2 * radio) + radio;
    let centroY = Math.random() * (500 - 2 * radio) + radio;
    document.getElementById('centroX').value = centroX;
    document.getElementById('centroY').value = centroY;
    document.getElementById('radio').value = radio;
    dibujarCircunferencia();
}

function limpiarCanvas() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

dibujarCircunferencia(
    document.getElementById('centroX').value,
    document.getElementById('centroY').value,
    document.getElementById('radio').value
);