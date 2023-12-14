document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
    const contenedorCarritoProductos = document.querySelector("#carrito-productos");
    const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
    const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

    // Obtener productos del carrito desde el localStorage
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    if (productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        const carritoProductosDiv = document.querySelector("#carrito-productos");
        carritoProductosDiv.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-item");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}" width="80px">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${producto.titulo}</span>
                    <div class="selector-cantidad">
                        <i class="bi bi-dash-square restar-cantidad" data-id="${producto.id}"></i>
                        <p>${producto.cantidad}</p>
                        <i class="bi bi-plus-square sumar-cantidad" data-id="${producto.id}"></i>
                    </div>
                    <span class="carrito-item-precio">${producto.precio}</span>
                </div>
                <span class="btn-eliminar" data-id="${producto.id}">
                    <i class="bi bi-trash3-fill"></i>
                </span>`;

            carritoProductosDiv.appendChild(div);

            // Agregar eventos a los botones de eliminar, sumar y restar
            const btnEliminar = div.querySelector(".btn-eliminar");
            btnEliminar.addEventListener("click", () => eliminarProducto(producto.id));

            const btnRestar = div.querySelector(".restar-cantidad");
            btnRestar.addEventListener("click", () => restarCantidad(producto.id));

            const btnSumar = div.querySelector(".sumar-cantidad");
            btnSumar.addEventListener("click", () => sumarCantidad(producto.id));
        });
    } else {
        // El carrito está vacío, puedes manejarlo aquí si es necesario
    }
});

// Función para eliminar un producto del carrito
function eliminarProducto(idProducto) {
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Encontrar el índice del producto con el ID especificado
    const index = productosEnCarrito.findIndex(producto => producto.id === idProducto);

    if (index !== -1) {
        // Eliminar el producto del array
        productosEnCarrito.splice(index, 1);

        // Guardar los nuevos productos en el localStorage
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        // Volver a cargar los productos en el carrito
        cargarProductosEnCarrito();
    }
}
// Función para restar una unidad de la cantidad de un producto en el carrito
function restarCantidad(idProducto) {
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    const producto = productosEnCarrito.find(p => p.id === idProducto);

    if (producto && producto.cantidad > 1) {
        producto.cantidad--;

        // Guardar los nuevos productos en el localStorage
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        // Volver a cargar los productos en el carrito
        cargarProductosEnCarrito();
    }
}

// Función para sumar una unidad a la cantidad de un producto en el carrito
function sumarCantidad(idProducto) {
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    const producto = productosEnCarrito.find(p => p.id === idProducto);

    if (producto) {
        producto.cantidad++;

        // Guardar los nuevos productos en el localStorage
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        // Volver a cargar los productos en el carrito
        cargarProductosEnCarrito();
    }
}

// Función para cargar productos en el carrito al cargar la página
function cargarProductosEnCarrito() {
    const carritoProductosDiv = document.querySelector("#carrito-productos");
    carritoProductosDiv.innerHTML = "";

    const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

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
                        <i class="bi bi-dash-square restar-cantidad" data-id="${producto.id}"></i>
                        <p>${producto.cantidad}</p>
                        <i class="bi bi-plus-square sumar-cantidad" data-id="${producto.id}"></i>
                    </div>
                    <span class="carrito-item-precio">${producto.precio}</span>
                </div>
                <span class="btn-eliminar" data-id="${producto.id}">
                    <i class="bi bi-trash3-fill"></i>
                </span>`;

            carritoProductosDiv.appendChild(div);

            // Agregar eventos a los botones de eliminar, sumar y restar
            const btnEliminar = div.querySelector(".btn-eliminar");
            btnEliminar.addEventListener("click", () => eliminarProducto(producto.id));

            const btnRestar = div.querySelector(".restar-cantidad");
            btnRestar.addEventListener("click", () => restarCantidad(producto.id));

            const btnSumar = div.querySelector(".sumar-cantidad");
            btnSumar.addEventListener("click", () => sumarCantidad(producto.id));
        });
    }
}