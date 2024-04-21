//aca todas las variables declaradas y botones y dom
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#contenedor-productos");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".boton-eliminar");
const botonVaciar = document.querySelector("#boton-vaciar");
const botonComprar = document.querySelector("#procesar-compra");
const contenedorTotal = document.querySelector("#total");
const total = document.querySelector(".prueba");
const notificacion = document.querySelector("#notificacion");

// para mostrar total = 0
total.innerHTML = "";
mostrarTotal();

//funcion usada para ir creando los elementos de productos en el carrito

function crearCarrito() {

    

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";
        
        
        
        productosEnCarrito.forEach(producto => {
    
            
        
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                <div class="carrito-info">
                    <h3>Articulo</h3>
                    <small>${producto.titulo}</small>
                </div>
                <div class="carrito-info">
                    <h3>Precio Unitario</h3>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-info">
                    <h3>Cantidad</h3>
                    <p>${producto.cantidad}</p>
                </div>
    
                <div class="carrito-info">
                    <h3>Subtotal</h3>
                    <p>$${producto.cantidad * producto.precio}</p>
                </div>
                <button id="${producto.id}" class="boton-eliminar">❌</button>
            `
            contenedorCarritoProductos.append(div);
            total.innerHTML = "";
            mostrarTotal();
            
        })
        
    
    } else {
        contenedorCarritoProductos.innerHTML = "";

        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    

}


crearCarrito();
//actualizamos los botones de eliminar de modo que podamos detectar el evento

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".boton-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}
//el resto de las funciones se explican solas con su nombre que hacen
function eliminarDelCarrito(e) {

    const idBoton = e.currentTarget.id;

    const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
    
    productosEnCarrito.splice(index, 1);
    
    crearCarrito();
    total.innerHTML = "";
    mostrarTotal();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    mostrarNotificacion()
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    crearCarrito();
    total.innerHTML = "";
    mostrarTotal();
}
botonComprar.addEventListener("click", procesarCompra);
function procesarCompra() {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
//muestro el total en la caja que corresopnde
function mostrarTotal() {

    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    

    const span = document.createElement("span");
    span.innerHTML = `
        <span>$${totalCalculado}</span>
    `
    total.append(span);

    

}

// notificacion
function mostrarNotificacion() {
    notificacion.style.display = 'block';
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 2000);
}
