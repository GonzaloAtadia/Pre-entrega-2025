const productos = [
    {
        id: "rubia cream",
        titulo: "Rubia Cream" ,
        imagen: "./imgs/rubiaCream.jpeg",
        categoria: {
            nombre: "Rubias",
            id: "rubias"
        }, 
        precio: 1000,
    },
    {
        id: "rubia durazno",
        titulo: "Rubia Durazno" ,
        imagen: "./imgs/rubiaDurazno.jpeg",
        categoria: {
            nombre: "Rubias",
            id: "rubias"
        }, 
        precio: 1000,
    },
    {
        id: "roja",
        titulo: "Roja" ,
        imagen: "./imgs/roja.jpeg",
        categoria: {
            nombre: "Rojas",
            id: "rojas"
        }, 
        precio: 1000,
    },
    {
        id: "rojas fdb",
        titulo: "Roja Fdb" ,
        imagen: "./imgs/rojaFdb.jpeg",
        categoria: {
            nombre: "Rojas",
            id: "rojas"
        }, 
        precio: 1000,
    },
    {
        id: "negra choco",
        titulo: "Negra Choco" ,
        imagen: "./imgs/negraChoco.jpeg",
        categoria: {
            nombre: "Negras",
            id: "negras"
        }, 
        precio: 1000,
    },
    {
        id: "negra stout",
        titulo: "Negra Stout" ,
        imagen: "./imgs/negraStout.jpeg",
        categoria: {
            nombre: "Negras",
            id: "negras"
        }, 
        precio: 1000,
    },
    {
        id: "lupulada ipa",
        titulo: "Lupulada Ipa" ,
        imagen: "./imgs/lupuIpa.jpeg",
        categoria: {
            nombre: "Rojas",
            id: "rojas"
        }, 
        precio: 1000,
    },
    {
        id: "lupulada neipa",
        titulo: "Lupulada Neipa" ,
        imagen: "./imgs/lupuNeipa.jpeg",
        categoria: {
            nombre: "Rubias",
            id: "rubias"
        }, 
        precio: 1000,
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCatergorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal"); 
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class"producto-detalle">
                <h3 class= "producto-titulo">${producto.titulo}</h3>
                <p class= "producto-precio">$${producto.precio}</p>
                <button class= "producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}


cargarProductos(productos);

botonesCatergorias.forEach(boton => { 
    boton.addEventListener("click", (e) => {

        botonesCatergorias.forEach(boton => boton.classList.remove("active"));
        e.currenTarget.classList.add("active");

        if (e.currenTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currenTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currenTarget.id);
            cargarProductos(productosBoton);

        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLs = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLs) {
    productosEnCarrito = JSON.parse(productosEnCarritoLs);
    actualizarNumerito();

} else {
    productosEnCarrito =[];

}

function agregarAlCarrito(e) {

    const idBoton = e.currenTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad= 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

