feather.replace();

//Variables
const Costos = {
    NOCHE : 150, 
    COMIDA : 60, 
    MASAJES : 20, 
    GYM : 10};

const resultados = {
    noches : 0,
    comidas : 0, 
    masajes : 0, 
    gym : 0, 
    todo : 0
};

let resultadosStorage = JSON.parse(sessionStorage.getItem('resultados'));
//const datosPersona = JSON.parse(sessionStorage.getItem());
const enviarForm = document.getElementById('enviarForm');
let todasReviews = [];
let cantidadMostrar = 5;


//APIs
function obtenerReviews() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener las reseñas. Codigo de estado: ${response.status}`);
            }
            return response.json();
        })
        .then(reviews => {
            todasReviews = reviews;
            mostrarReviews();
        })
        .catch(error => {
            console.error(error.message);
        });
}

async function iniciarMapa() {
    const cajaMapa = document.getElementById('mapa');
    const mapa = document.createElement('iframe');

    mapa.class = "mapa";
    mapa.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26183.282658989796!2d-56.05206365!3d-34.8835979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f8668f57f7c21%3A0x90410130e1f9f3e6!2sCarrasco%2C%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses-419!2suy!4v1706330296020!5m2!1ses-419!2suy";
    mapa.width = "100%";
    mapa.height = "100%";
    mapa.style = "border:0;";
    mapa.allowfullscreen = "true";
    mapa.loading = "lazy";
    mapa.referrerpolicy = "no-referrer-when-downgrade";

    cajaMapa.appendChild(mapa);

}


//Funciones
//Mostrar Reseñas
function mostrarReviews() {
    const contenedorReviews = document.getElementById('reviews');
    contenedorReviews.innerHTML = `<h5>Reseñas</h5>`;

    todasReviews.slice(-cantidadMostrar).forEach(review => {
        const divReviews = document.createElement('div');
        divReviews.classList.add('review');

        const usuarioElemento = document.createElement('div');
        usuarioElemento.classList.add('usuario');
        usuarioElemento.textContent = review.email;

        const textoReviewsElemento = document.createElement('div');
        textoReviewsElemento.classList.add('texto-review');
        textoReviewsElemento.textContent = review.body;

        divReviews.appendChild(usuarioElemento);
        divReviews.appendChild(textoReviewsElemento);
        contenedorReviews.appendChild(divReviews);
    });

    if (cantidadMostrar < todasReviews.length) {
        const botonCargarMas = document.createElement('button');
        botonCargarMas.textContent = 'Cargar más reseñas';
        botonCargarMas.setAttribute('class', 'boton1');

        botonCargarMas.addEventListener('click', () => {
            cantidadMostrar += 5;
            mostrarReviews();
        });

        if (cantidadMostrar > 5) {
            const botonCargarMenos = document.createElement('button');
            botonCargarMenos.textContent = 'Reducir reseñas';
            botonCargarMenos.setAttribute('class', 'boton1');

            botonCargarMenos.addEventListener('click', () => {
                cantidadMostrar = 5;
                mostrarReviews();
            });

            contenedorReviews.appendChild(botonCargarMenos);
        }
        
        contenedorReviews.appendChild(botonCargarMas);
    }
}

//Boton de submit
enviarForm.addEventListener('click', () => {
    const personas = document.getElementById('personas');
    const noches = document.getElementById('noches');
    const comidas = document.getElementById('comidas');
    const masajes = document.getElementById('masajes');
    const gym = document.getElementById('gym');

    if (personas.value && noches.value && comidas.value && masajes.value && gym.value) {
        const Datos = {
            'personas' : personas.value,
            'noches' : noches.value,
            'comidas' : comidas.value,
            'masajes' : masajes.value,
            'gym' : gym.value
        };
        console.log('Datos enviados');
        calcularCostos(Datos);
    }
    
});

const calcularCostos = (datos) => {
    resultados.noches = datos.noches * Costos.NOCHE;
    resultados.comidas = datos.comidas * Costos.COMIDA;
    resultados.masajes = datos.masajes * Costos.MASAJES;
    resultados.gym = datos.gym * Costos.GYM;
    resultados.todo = resultados.noches + resultados.comidas + resultados.masajes + resultados.gym;

    console.log('Costo calculado');
    mostrarCostos(resultados);
};

const mostrarCostos = (datos) => {
    let resultados = document.getElementById('resultados');
    if (datos) {
        resultados.innerHTML = `
    <p><b>Monto total de costos por cada servicio:</b></p>
    `;

    for (const elemento in datos) {
        resultados.innerHTML += `
        <p>El costo total por ${elemento} es: ${datos[elemento]} USD.</p>
        `;
    }
    }
}


//Programa principal
obtenerReviews();
iniciarMapa();


//Para iniciarSesion.html
//Variables
const borrarDatos = document.getElementById('borrarForm');
const formularioRegistro = document.getElementById('formularioRegistro');
let personaActual;

//Funciones
formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('inputName');
    const correo = document.getElementById('inputEmail');
    const terminos = document.getElementById('terminos');
    const regex = /^[a-zA-Z\s]{2,}$/;
    let datosJSON = [];
    
    personaActual = nombre;

    if (nombre.value && correo.value && terminos.checked) {
        datosJSON.push({
            'nombre' : nombre.value,
            'correo' : correo.value,
            'carrito' : {}
        });
        localStorage.setItem(nombre.value, JSON.stringify(datosJSON));
        window.location.href = 'index.html';
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
    sessionStorage.setItem(nombre.value, JSON.stringify(datosJSON))
    
});