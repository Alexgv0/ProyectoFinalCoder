//Variables
const borrarDatos = document.getElementById('borrarForm');
const formularioRegistro = document.getElementById('formularioRegistro');


//Funciones
formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('inputName');
    const correo = document.getElementById('inputEmail');
    const terminos = document.getElementById('terminos');
    const regex = /^[a-zA-Z\s]{2,}$/;
    let datosJSON = {};


    if (nombre.value && correo.value && terminos.checked) {
        datosJSON = {
            'nombre' : nombre.value,
            'correo' : correo.value,
            'carrito' : {},
            'compras' : []
        };


        sessionStorage.setItem('nombre', JSON.stringify(nombre.value));
        localStorage.setItem(nombre.value, JSON.stringify(datosJSON));
        window.location.href = '../index.html';

    } else {
        if ((nombre.value === "") || !(regex.test(nombre.value))) {
            const ayudaNombre = document.getElementById('nameHelp');
            console.log("Falta introducir el nombre");
            ayudaNombre.innerText = `Introduzca un nombre valido.`;
            ayudaNombre.classList.add('text-warning');
            nombre.focus();
            setTimeout(() => {
                ayudaNombre.innerText = `Introduzca su nombre y apellido.`;
                ayudaNombre.classList.remove('text-warning');
            }, 10000);
        } 
    else {
        if (correo.value === "") {
            const ayudaCorreo = document.getElementById('emailHelp');
            console.log("Error con correo");
            ayudaCorreo.innerText = `Introduzca un correo electronico valido.`;
            ayudaCorreo.classList.add('text-warning');
            correo.focus();
            setTimeout(() => {
                ayudaCorreo.innerText = `Introduzca su correo electronico.`;
                ayudaCorreo.classList.remove('text-warning');
            }, 10000);
        } 
    else {
        if (!terminos.checked) {
            const ayudaTerminos = document.createElement('p');
            const letraTerminos = document.getElementById('letraTerminos');
            ayudaTerminos.textContent = `Debes de aceptar los términos para continuar.`;
            ayudaTerminos.classList.add('text-warning');
            console.log("Error con terminos");
            letraTerminos.insertAdjacentElement('afterend', ayudaTerminos);
            terminos.focus();
            setTimeout(() => {
                ayudaTerminos.remove();
            }, 10000);
        }
    }
    }
    }
    console.log(datosJSON);
    
});