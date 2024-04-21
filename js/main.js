productos = [

    {
        id: 1,
        titulo: "Combo Caña de Pescar",
        precio: "380",
        imagen: './material/combo-cana.png'
    },
    {
        id: 2,
        titulo: "Combo Señuelos",
        precio: "120",
        imagen: './material/combo-senuelos.png'
    },
    {
        id: 3,
        titulo: "Red de Pesca",
        precio: "200",
        imagen: './material/red-de-pesca.png'
    },
    {
        id: 4,
        titulo: "Reel Shimano Pro",
        precio: "300",
        imagen: './material/reel-shimano.png'
    }

]

const contenedorProductos = document.querySelector("#contenedor-productos")
let botonesAgregar = document.querySelectorAll(".main-product-button")
const notificacion = document.querySelector("#notificacion");
//usa los datos del primer array para cargar los productos en cards que cree yo
function cargarProductos() {

    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("main-product");
        div.innerHTML = `
        <div class="main-product-img">
            <img src="${producto.imagen}" alt="${producto.titulo}">
        </div>
            <h2 class="main-product-h2">${producto.titulo}</h2>
            <p class="main-product-p">$${producto.precio}</p>

        <div class="button-flex">
            <button class="main-product-button" id="${producto.id}"><p>Agregar al Carrito</p></button>
        </div>
        `

        contenedorProductos.append(div);

    });

    actualizarBotonesAgregar();
    

}

cargarProductos();

function actualizarBotonesAgregar() {
    botonesAgregar =document.querySelectorAll(".main-product-button")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton);
    
    

    if (productosEnCarrito.some(producto => producto.id == idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[index].cantidad++;
        mostrarNotificacion();
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado); 
        mostrarNotificacion();
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}



function mostrarNotificacion() {
    notificacion.style.display = 'block';
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 2000);
}