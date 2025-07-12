let carrito = cargarCarritoDesdeStorage();
const carritoContenedor = document.getElementById("carrito");
const totalElemento = document.getElementById("total");

// Cargar productos ya guardados
actualizarCarrito();

// Botones de compra
document.querySelectorAll('.btn-comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    agregarProducto(nombre, precio);
    actualizarCarrito();
  });
});

function agregarProducto(nombre, precio) {
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardarCarritoEnStorage();
}

function eliminarProducto(nombre) {
  const index = carrito.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarritoEnStorage();
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  carritoContenedor.innerHTML = '';
  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.className = 'carrito-item';
    item.innerHTML = `
      ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
      <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
    `;

    carritoContenedor.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  totalElemento.textContent = `Total: $${total}`;
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = []; // Vaciar el arreglo
  guardarCarritoEnStorage(); // Limpiar localStorage
  actualizarCarrito(); // Actualizar la vista
}

// Asociar el botón al evento
document.getElementById("vaciar-carrito").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    vaciarCarrito();
  }
});
