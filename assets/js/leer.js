// leer mas
let i = 0;
let button = document.querySelector('#button').addEventListener('click', function() {
    if (!i) {
        document.getElementById('leerMas').style.display = 'inline';
        document.getElementById('card').style.height = '800px';
        document.getElementById('button').innerHTML = 'Leer menos';
        i = 1;
    } else {
        document.getElementById('leerMas').style.display = 'none';
        document.getElementById('card').style.height = '600px';
        document.getElementById('button').innerHTML = 'Leer más';
        i = 0;
    }

})