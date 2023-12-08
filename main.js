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
        id: "camiseta-1",
        titulo: "Selección Argentina",
        imagen: "../img/image_7ccdd99b-17d1-4e03-9669-3ed4b4db5e10.webp", 
        precio: "25.000",
    },
    {
        id: "camiseta-2",
        titulo: "River Plate",
        imagen: "../img/river.webp", 
        precio: "25.000"
    },
    {
        id: "camiseta-3",
        titulo: "Boca Juniors",
        imagen: "../img/boca.webp", 
        precio: "25.000"
    },
    {
        id: "camiseta-4",
        titulo: "Inter Miami",
        imagen: "../img/INTER MIAMI.webp", 
        precio: "25.000"
    },
    {
        id: "camiseta-5",
        titulo: "Real Madrid",
        imagen: "../img/real madrid.webp", 
        precio: "25.000"
    }
];   



const contenedorProductos = document.querySelector("#contenedor-productos");
const carrito = [];
const carritoNumero = document.querySelector(".carrito-numero");
const productosEnCarrito = [];
const numerito = document.querySelector("#numerito");

function cargarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("gallery", "content");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3>Camiseta</h3>
            <p>${producto.titulo}</p>
            <h6>${producto.precio}</h6>
            <button id="${producto.id}" class="buy-1">Agregar al carrito</button>
        </div>`;

        contenedorProductos.appendChild(div);

        const botonAgregar = div.querySelector(`#${producto.id}`);
        botonAgregar.addEventListener("click", (e) => agregarAlCarrito(productosArray, producto, e));
    });
}

function agregarAlCarrito(productos, producto, evento) {
    const idBoton = evento.currentTarget.id;
    const productoAgregado = productos.find(p => p.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

cargarProductos(productosArray);


document.addEventListener("DOMContentLoaded", () => {
    const productosEnCarritoGuardados = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    productosEnCarrito.push(...productosEnCarritoGuardados);
    actualizarNumerito();
    cargarProductosEnCarrito();
});

// Agregar evento al botón de vaciar carrito
const vaciarCarritoBtn = document.querySelector("#carrito-acciones small");
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

// Función para vaciar el carrito
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    actualizarNumerito();
    guardarProductosEnCarrito();
    cargarProductosEnCarrito();
}

// Función para cargar productos en el carrito al cargar la página
function cargarProductosEnCarrito() {
    const carritoProductosDiv = document.querySelector("#carrito-productos");
    carritoProductosDiv.innerHTML = "";

    if (productosEnCarrito.length === 0) {
        document.getElementById("carrito-vacio").classList.remove("disabled");
    } else {
        document.getElementById("carrito-vacio").classList.add("disabled");
        document.getElementById("carrito-productos").classList.remove("disabled");

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-item");
            div.innerHTML = `<img src="${producto.imagen}" alt="${producto.titulo}" width="80px">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${producto.titulo}</span>
                    <div class="selector-cantidad">
                        <i class="bi bi-dash-square restar-cantidad"></i>
                        <p>${producto.cantidad}</p>
                        <i class="bi bi-plus-square sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">${producto.precio}</span>
                </div>
                <span class="btn-eliminar" id="${producto.id}">
                    <i class="bi bi-trash3-fill"></i>
                </span>`;

            carritoProductosDiv.appendChild(div);
        });
    }
}

// Función para guardar productos en el carrito en el localStorage
function guardarProductosEnCarrito() {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


// Evento para sumar o restar cantidad desde el carrito
document.getElementById("carrito-productos").addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("restar-cantidad")) {
        restarCantidad(target);
    } else if (target.classList.contains("sumar-cantidad")) {
        sumarCantidad(target);
    } else if (target.classList.contains("btn-eliminar")) {
        eliminarProducto(target);
    }
});

// Función para restar la cantidad de un producto en el carrito
function restarCantidad(element) {
    const id = element.parentElement.parentElement.parentElement.querySelector(".btn-eliminar").id;
    const producto = productosEnCarrito.find(p => p.id === id);

    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        actualizarNumerito();
        guardarProductosEnCarrito();
        cargarProductosEnCarrito();
    }
}

// Función para sumar la cantidad de un producto en el carrito
function sumarCantidad(element) {
    const id = element.parentElement.parentElement.parentElement.querySelector(".btn-eliminar").id;
    const producto = productosEnCarrito.find(p => p.id === id);

    if (producto) {
        producto.cantidad++;
        actualizarNumerito();
        guardarProductosEnCarrito();
        cargarProductosEnCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(element) {
    const id = element.id;
    const index = productosEnCarrito.findIndex(p => p.id === id);

    if (index !== -1) {
        productosEnCarrito.splice(index, 1);
        actualizarNumerito();
        guardarProductosEnCarrito();
        cargarProductosEnCarrito();
    }
}