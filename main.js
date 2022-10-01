// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
var texto = null;
var texto1 = null;
var temporizador = false;
var timer = 30;
var timerInicial = 30;
var tiempoRegresivoId = null;

// APUNTANDO AL DOCUMENTO HTML
var mostrarMovimientos = document.getElementById('movimientos');
var mostrarAciertos = document.getElementById('aciertos');
var mostrarTiempo = document.getElementById('t-restante');

// NUMEROS EN EL ARRAY
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; /* Arreglo */
numbers = numbers.sort(()=>{return Math.random()-0.5}); /* Desordenar arreglo */
console.log(numbers); /* Estamos viendo los arreglos en consola */
 
// FUNCIONES

function contarTiempo(){
    tiempoRegresivoId = setInterval(() => {
        timer--; /* Variable que controla los segundos */
        mostrarTiempo.innerHTML = "Tiempo: " + timer + " segundos"; // Vamos mostrando el tiempo que recorre
        if(timer == 0){ // Si el tiempo es igual a 0 entonces:
            clearInterval(tiempoRegresivoId);  // Limpiamos el tiempo
            bloquearTarjetas()
        }
    }, 1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) { // Ciclo for
        let tarjetaBloqueada = document.getElementById(i); // Vamos a mostrar todas las tarjetas cuando se acabe el tiempo
        tarjetaBloqueada.innerHTML = numbers[i]; // Aqui mostramos los numeros del arreglo
        tarjetaBloqueada.disabled = true; // Tambien vamos a bloquear las tarjetas cuando finalice el juego
    }
}

// Funcion principal
function destapar(id){

    // CONTEO DE TIEMPO
    if(temporizador == false){ 
        contarTiempo(); // FUNCION CONTAR TIEMPO
        temporizador = true; // Se inicializa en false y lo cambiamos a true
    }

    tarjetasDestapadas ++; /* estamos sumando de a uno en el id que envian */
    console.log(tarjetasDestapadas); /* Mostramos en la consola lo que llevamos*/ 

    if(tarjetasDestapadas == 1){ /* Si al seleccionar la tarjeta es igual a 1 entonces: */
        // Mostrar Primer numero
        tarjeta1 = document.getElementById(id); /* estoy trayendo el id de html */
        primerResultado = numbers[id]; /* Estoy asignando uno de los numeros a la variable */
        tarjeta1.innerHTML = primerResultado; /* Estamos mostrando la posicion con el numero del id en la tarjeta cuando la giran */

        // Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2) { // Si al tener un numero dos entonces hacemos lo siguiente: 
        // Mostrar Segundo numero
        tarjeta2 = document.getElementById(id); /* estoy trayendo el id de html */
        segundoResultado = numbers[id]; /* Estoy asignando uno de los numeros a la variable */
        tarjeta2.innerHTML = segundoResultado; /* Estamos mostrando la posicion con el numero del id en la tarjeta cuando la giran */

        // Deshabilitar primer boton
        tarjeta2.disabled = true;
        
        // Incrementar movimientos
        movimientos++;
        texto = "Movimientos: ";
        mostrarMovimientos.innerHTML = texto + movimientos /* Se incrementa el valor de movimientos */
        
        // SUMAMOS LOS ACIERTOS

        if (primerResultado == segundoResultado){
            // Encerrar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++; // Sumamos un acierto cuando los dos numeros son iguales
            texto1 = "Aciertos: "; // Texto que vamos a mostrar
            mostrarAciertos.innerHTML = texto1 + aciertos; // Mostramos las dos variables

            // Cuando aciertan todos los cuadros
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = texto1 + aciertos  + " 😱";
                mostrarTiempo.innerHTML = "Fantástico 🎉 solo te demoraste " + (timerInicial - timer) + " segundos";
                mostrarMovimientos.innerHTML = texto + movimientos + " 🤩😎";
            }
        }else{
             // Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => { /* Este parametro nos sirve para mostrar algo por un breve tiempo */
                tarjeta1.innerHTML = ' '; // Hace efecto de borrar
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false; /* Vamos a habilitar la opcion de que la tarjeta se pueda volver a escoger */
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0 // Vuelve e inicia
            }, 800); // milisegundos, de espera por si nos equivocamos, las tarjetas vuelven a girarsen
        }
    }

}
