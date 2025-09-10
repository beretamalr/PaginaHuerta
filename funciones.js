// Función para manejar el inicio de sesión tradicional
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Limpiar mensajes de error
    document.getElementById("errorUsuario").textContent = "";
    document.getElementById("errorContrasena").textContent = "";
    document.getElementById("errorGeneral").textContent = "";

    // Validar usuario y contraseña
    if (usuario === "admin" && contrasena === "1234") {
        alert("Inicio de sesión exitoso");
        window.location.href = "index2.html";
        return true;
    } else if (usuario === "" && contrasena === "") {
        document.getElementById("errorGeneral").textContent = "Por favor, ingrese el usuario y la contraseña";
        return false;
    } else if (usuario === "") {
        document.getElementById("errorUsuario").textContent = "Por favor, ingrese el usuario";
        return false;
    } else if (contrasena === "") {
        document.getElementById("errorContrasena").textContent = "Por favor, ingrese la contraseña";
        return false;
    } else if (usuario !== "admin" && contrasena !== "1234") {
        document.getElementById("errorGeneral").textContent = "El usuario o la contraseña son incorrectos";
        return false;
    } else if (usuario !== "admin") {
        document.getElementById("errorUsuario").textContent = "Usuario incorrecto";
        return false;
    } else if (contrasena !== "1234") {
        document.getElementById("errorContrasena").textContent = "Contraseña incorrecta";
        return false;
    }
}

// Renderizar el botón de Google y manejar el login con Google
window.onload = function() {
    google.accounts.id.initialize({
        client_id: "899669678014-48uo0pb98elle6mpkcneb3hgekjrpr89.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        { theme: "outline", size: "large" }
    );
    // google.accounts.id.prompt(); // Opcional
};

function handleCredentialResponse(response) {
    alert("Iniciando sesión con Google");
    console.log('Token de Google:', response.credential);
    window.location.href = "index2.html";
}

// Puedes dejar las funciones de Facebook y Microsoft igual
function loginConFacebook() {
    alert("Función de Facebook no implementada");
}

function loginConMicrosoft() {
    alert("Función de Microsoft no implementada");
}


// Función para agregar productos al carrito usando localStorage
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad += producto.cantidad;
    } else {
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
let productoSeleccionado = null;

// Función para abrir el modal y seleccionar la cantidad
function abrirModalCantidad(producto) {
    productoSeleccionado = producto;
    document.getElementById('modal-nombre').textContent = producto.nombre;
    document.getElementById('modal-imagen').src = producto.imagen;
    document.getElementById('modal-cantidad-input').value = 1;
    document.getElementById('modal-cantidad').style.display = 'flex';
}

// Función para cerrar el modal
function cerrarModalCantidad() {
    document.getElementById('modal-cantidad').style.display = 'none';
    productoSeleccionado = null;
}

// Función para confirmar la cantidad y agregar al carrito
function confirmarCantidad() {
    const cantidad = parseInt(document.getElementById('modal-cantidad-input').value);
    if (productoSeleccionado && cantidad > 0) {
        agregarAlCarrito({
            ...productoSeleccionado,
            cantidad
        });
        cerrarModalCantidad();
        alert('🛒Producto agregado al carrito');
    }
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tbody = document.querySelector('#tabla-carrito tbody');
    tbody.innerHTML = '';
    let total = 0;
    carrito.forEach((producto, i) => {
        const totalProducto = producto.precio * producto.cantidad;
        total += totalProducto;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
            <td>$${totalProducto}</td>
            <td><button onclick="eliminarDelCarrito(${i})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });
    document.getElementById('total-carrito').textContent = total;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

window.onload = mostrarCarrito;

