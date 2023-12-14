document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    const toggle = document.getElementById('modoOscuro');
    const body = document.querySelector('body');

    toggle.addEventListener('click', function () {
        this.classList.toggle('bi-moon');
        if (this.classList.toggle('bi-brightness-high-fill')) {
            body.style.background = 'white';
            body.style.color = 'black';
            body.style.transition = '2s';
        } else {
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

    cargarProductos(productosArray);

    const vaciarCarritoBtn = document.querySelector("#carrito-acciones small");
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    document.addEventListener("DOMContentLoaded", () => {
        const productosEnCarritoGuardados = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
        productosEnCarrito.push(...productosEnCarritoGuardados);
        actualizarNumerito();
        cargarProductosEnCarrito();
    });

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

            if (contenedorProductos) {
                contenedorProductos.appendChild(div);
            } else {
                console.error("No se encontró el contenedor de productos.");
            }

            const botonAgregar = div.querySelector(`#${producto.id}`);
            botonAgregar.addEventListener("click", (e) => agregarAlCarrito(productosArray, producto, e));
        });
    }

    function agregarAlCarrito(productos, producto, evento) {
        const idBoton = evento.currentTarget.id;
        const productoAgregado = productos.find(p => p.id === idBoton);

        if (productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }

        actualizarNumerito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    };

    function eliminarDelCarrito(id) {
        const index = productosEnCarrito.findIndex(producto => producto.id === id);
        if (index !== -1) {
            productosEnCarrito.splice(index, 1);
            guardarProductosEnCarrito();
            actualizarNumerito();
            cargarProductosEnCarrito();
        }
    }

    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }

    function vaciarCarrito() {
        productosEnCarrito.length = 0;
        actualizarNumerito();
        guardarProductosEnCarrito();
        cargarProductosEnCarrito();
    }

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

                const btnEliminar = div.querySelector(".btn-eliminar");
                btnEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));
            });
        }
    }

    function guardarProductosEnCarrito() {
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
});