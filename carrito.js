const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

if (productosEnCarrito) {

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-productos");
        div.innerHTML = `<div class="carrito-item">
        <img src="${producto.imagen}"alt="${producto.titulo}" width="80px">
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
        </span>
        </div>
        `;

        contenedorCarritoProductos.append(div);
    })
    



} else {

}