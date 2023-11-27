const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
    el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
    el: '.swiper-scrollbar',
    },
});


const toggle = document.getElementById('modoOscuro');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';
    }
});


const productosArray = [
    {
        id: "camiseta-Argentina-1",
        titulo: "Selección Argentina",
        imagen: "../img/image_7ccdd99b-17d1-4e03-9669-3ed4b4db5e10.webp", 
        precio: "25.000",
    },
    {
        id: "camiseta-Argentina-2",
        titulo: "Selección Argentina",
        imagen: "../img/image_7ccdd99b-17d1-4e03-9669-3ed4b4db5e10.webp", 
        precio: "25.000"
    },
    {
        id: "camiseta-Argentina-3",
        titulo: "Selección Argentina",
        imagen: "../img/image_7ccdd99b-17d1-4e03-9669-3ed4b4db5e10.webp", 
        precio: "25.000"
    },
    {
        id: "camiseta-Argentina-4",
        titulo: "Selección Argentina",
        imagen: "../img/image_7ccdd99b-17d1-4e03-9669-3ed4b4db5e10.webp", 
        precio: "25.000"
    }
];   



const contenedorProductos = document.querySelector("#contenedor-productos");

cargarProductos(productosArray);

function cargarProductos(productos) {
    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("gallery","content");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3>Camiseta</h3>
            <p>${producto.titulo}</p>
            <h6>${producto.precio}</h6>
            <button id="${producto.id}" class="buy-1">Agregar al carrito</button>
        </div>`;

        contenedorProductos.appendChild(div);
    });
}





document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contacto form');
    form.addEventListener('submit', function (event) {

        // Reiniciar mensajes de error
        const mensajesError = document.querySelectorAll('.error-message');
        mensajesError.forEach(errorMsg => errorMsg.textContent = '');

        // Validar nombre (permitir enviar si tiene al menos 3 letras)
        const nombre = form.querySelector('#name').value.trim();
        if (nombre.length <= 2) {
            valido = false;
            console.error('Error en nombre');
            document.getElementById('nameError').textContent = 'El nombre debe tener al menos 3 caracteres.';
        }

        // Validar número de teléfono (validación simple, podrías mejorarla)
        const telefono = form.querySelector('#phone').value.trim();
        if (!/^\d{9,15}$/.test(telefono)) {
            valido = false;
            console.error('Error en teléfono');
            document.getElementById('phoneError').textContent = 'Ingrese un número de teléfono válido (entre 9 y 15 dígitos).';
        }

        // Validar correo electrónico
        const correo = form.querySelector('#email').value.trim();
        if (!correo.includes('@')) {
            valido = false;
            console.error('Error en correo electrónico');
            document.getElementById('emailError').textContent = 'Ingrese una dirección de correo electrónico válida.';
        }

        // Validar mensaje
        const mensaje = form.querySelector('#message').value.trim();
        if (mensaje.length < 5) {
            valido = false;
            console.error('Error en mensaje');
            document.getElementById('messageError').textContent = 'El mensaje debe tener al menos 5 caracteres.';
        }

        if (!valido) {
            event.preventDefault(); // Evitar el envío del formulario si falla la validación
        }
    });
});