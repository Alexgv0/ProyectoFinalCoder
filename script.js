feather.replace();

//Variables
//
const Costos = {
    NOCHE : 150, 
    COMIDA : 60, 
    MASAJES : 20, 
    GYM : 10};

const resultados = {
    estadia : 0,
    comidas : 0, 
    masajes : 0, 
    gym : 0, 
    todo : 0
};

const enviarDatos = document.getElementById('enviarDatos');
const personaSS = JSON.parse(sessionStorage.getItem('nombre'));
const personaLS = JSON.parse(localStorage.getItem(personaSS));
const simulacion = document.getElementById('resultados');
const agregarCarrito = document.getElementById('agregarCarrito');
const carrito = document.getElementById('carrito');
let todasReviews = [];
let cantidadMostrar = 5;


//APIs
//
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
//
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

//Calcula los costos
const calcularCostos = (datos) => {
    resultados.estadia = datos.personas * datos.estadia * Costos.NOCHE;
    resultados.comidas = datos.personas * datos.estadia * datos.comidas * Costos.COMIDA;
    resultados.masajes = datos.masajes * datos.estadia * Costos.MASAJES;
    resultados.gym = datos.gym * datos.estadia * Costos.GYM;
    resultados.todo = resultados.estadia + (resultados.comidas + resultados.masajes + resultados.gym);

    console.log('Costo calculado');

};

//Muestra los costos en el contenedor
const mostrarCostos = (datos, container) => {
    
    if (datos) {
        container.innerHTML = `
    <p><b>Monto total de costos por cada servicio:</b></p>
    `;

    for (const elemento in datos) {
        container.innerHTML += `
        <p>El costo total por ${elemento} es: ${datos[elemento]} USD.</p>
        `;
    }
    
    }
}

//Carga el carrito
const cargarCarrito = () => {
    if (personaSS.length > 0) {

        mostrarCostos(personaLS.carrito, carrito);
        carrito.innerHTML +=  `
        <input id="eliminarCarrito" class="boton1" value="Eliminar Carrito"/>`;
        carrito.innerHTML +=  `
        <input id="pagar" class="boton1" value="Comprar reserva"/>`;

        const agregarCompra = document.getElementById('pagar');

        //Elimina elementos del carrito
        eliminarCarrito = document.getElementById('eliminarCarrito');
        eliminarCarrito.addEventListener('click', () => {
            personaLS.carrito = {};
            localStorage.setItem(personaSS, JSON.stringify(personaLS));
            carrito.innerHTML = `<p>No hay elementos en tu carrito.</p>`;
        })
       
        console.log(personaLS);
        console.log(`Carrito de ${personaSS} iniciado correctamente`);

        //Boton de agregar a la compra
        agregarCompra.addEventListener('click', () => {
                
            if (((personaLS.compras.length > 0) && !(personaLS.compras.indexOf(personaLS.carrito) !== -1)) || 
            (personaLS.compras.length === 0)) {
                console.log(1);
                personaLS.compras.push(personaLS.carrito);
                personaLS.carrito = {};
                localStorage.setItem(personaSS, JSON.stringify(personaLS));

                carrito.innerHTML = `<p>Los elementos del carrito fueron agregados a la lista de compras efectuadas.</p>`;

                console.log(`Carrito de ${personaLS.nombre} agregado al compras efectuadas`);

            } else {
                carrito.innerHTML += `<p>Los elementos del carrito ya estan agregados a la lista de compras efectuadas.</p>`;
            }
        });

    }
}


//Programa principal
//
obtenerReviews();
iniciarMapa();

if (personaSS && personaLS.carrito) {

    if (Object.keys(personaLS.carrito).length > 0) {
        cargarCarrito();
        console.log(`Carrito cargado por inicio`);
    }
    
}

//Boton de confirmar datos para el simulacro
enviarDatos.addEventListener('click', () => {
    const personas = document.getElementById('personas');
    const estadia = document.getElementById('estadia');
    const comidas = document.getElementById('comidas');
    const masajes = document.getElementById('masajes');
    const gym = document.getElementById('gym');

    if (personas.value && estadia.value && comidas.value && masajes.value && gym.value) {
        const Datos = {
            'personas' : personas.value,
            'estadia' : estadia.value,
            'comidas' : comidas.value,
            'masajes' : masajes.value,
            'gym' : gym.value
        };

        console.log('Datos enviados');
        calcularCostos(Datos);
        mostrarCostos(resultados, simulacion);


        if (personaSS) {
            simulacion.innerHTML += `<input class="boton1" id="agregarCarrito" type="submit" value="Agregar al carrito" />`;

            const agregarCarrito = document.getElementById('agregarCarrito');

            //Boton de agregar al carrito
            agregarCarrito.addEventListener('click', () => {
                if (personaLS.length > 0 || personaSS) {
    
                    personaLS.carrito = resultados;
                    localStorage.setItem(personaSS, JSON.stringify(personaLS));
                    cargarCarrito();
    
                    simulacion.innerHTML = ``;
    
                    console.log(`Carrito cargado al agregar un elemento`);
                    console.log(`Simulacro de ${personaLS.nombre} agregado al carrito`);
                }
            });
        } else {
            simulacion.innerHTML += `
            <p>Para poder agregar al carrito necesitas <a href="./Paginas/iniciarSesion.html">iniciar sesion</a></p>`;
        }
    }
    
});