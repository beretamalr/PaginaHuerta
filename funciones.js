// Guarda el usuario actual en localStorage
function guardarDatosUsuario(nombre, correo) {
    localStorage.setItem('usuarioActual', JSON.stringify({ nombre, correo }));
}
// Función para manejar el inicio de sesión tradicional
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Limpiar mensajes de error
    document.getElementById("errorUsuario").textContent = "";
    document.getElementById("errorContrasena").textContent = "";
    document.getElementById("errorGeneral").textContent = "";
    // Obtener todos los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuarioRegistrado = usuarios.find(u => u.nombre === usuario && u.contrasena === contrasena);

    if (usuarioRegistrado) {
        document.getElementById("mensaje").textContent = "Inicio de sesión exitoso";
        guardarDatosUsuario(usuarioRegistrado.nombre, usuarioRegistrado.correo);
        setTimeout(function() {
            window.location.href = "index2.html";
        }, 500);
        return true;
    }

    // Validar usuario y contraseña
    if (usuario === "admin" && contrasena === "1234") {
        document.getElementById("mensaje").textContent = "Inicio de sesión exitoso";
        guardarDatosUsuario(usuario, "admin@ejemplo.com");
        setTimeout(function() {
            window.location.href = "index2.html";
        }, 500);
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

//Funcion para registrar un usuario
function registrarUsuario() {
    const nombre = document.getElementById('nuevo-usuario').value;
    const correo = document.getElementById('nuevo-correo').value;
    const contrasena = document.getElementById('nueva-contrasena').value;

    // Obtener usuarios existentes o crear un arreglo vacío
    let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

    // Verificar si el correo ya está registrado
    const existe = usuarios.some(u => u.correo === correo);
    if (existe) {
        document.getElementById('modal-mensaje').textContent = 'El correo ya está registrado.';
        document.getElementById('modal').style.display = 'block';
        return;
    }

    // Agregar el nuevo usuario
    usuarios.push({ nombre, correo, contrasena });

    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
    // Opcional: mostrar mensaje de éxito
    document.getElementById('modal-mensaje').textContent = '¡Registro exitoso!';
    document.getElementById('modal').style.display = 'block';
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


// =====================
// FUNCIONALIDAD DE CARRITO
// =====================

// Variable global para guardar el producto seleccionado en el modal
let productoSeleccionado = null;

/**
 * Abre el modal para elegir cantidad y muestra la pregunta correcta
 * según si el producto se vende por unidad o por kg.
 */
function abrirModalCantidad(producto) {
    productoSeleccionado = producto;
    document.getElementById('modal-nombre').textContent = producto.nombre;
    document.getElementById('modal-imagen').src = producto.imagen;
    // Detectar si el precio es por unidad o por kg
    let pregunta = '¿Cuántos kg desea agregar?';
    if (typeof producto.precio === 'string') {
        if (producto.precio.includes('c/u')) {
            pregunta = '¿Cuántas unidades desea llevar?';
        } else if (producto.precio.includes('/kg')) {
            pregunta = '¿Cuántos kg desea agregar?';
        }
    } else {
        // Buscar el elemento del producto por nombre y obtener el texto del precio
        let cards = document.querySelectorAll('.producto-card-tienda');
        for (let card of cards) {
            let nombre = card.querySelector('h3');
            let precio = card.querySelector('.precio');
            if (nombre && precio && nombre.textContent === producto.nombre) {
                if (precio.textContent.includes('c/u')) {
                    pregunta = '¿Cuántas unidades desea llevar?';
                } else if (precio.textContent.includes('/kg')) {
                    pregunta = '¿Cuántos kg desea agregar?';
                }
                break;
            }
        }
    }
    document.querySelector('#modal-cantidad p').textContent = pregunta;
    document.getElementById('modal-cantidad-input').value = 1;
    document.getElementById('modal-cantidad').style.display = 'flex';
}

/**
 * Cierra el modal de cantidad
 */
function cerrarModalCantidad() {
    document.getElementById('modal-cantidad').style.display = 'none';
    productoSeleccionado = null;
}

/**
 * Confirma la cantidad elegida y guarda el producto en el carrito (localStorage)
 */
function confirmarCantidad() {
    const cantidad = parseInt(document.getElementById('modal-cantidad-input').value);
    if (!productoSeleccionado || isNaN(cantidad) || cantidad < 1) return;
    let carrito = JSON.parse(localStorage.getItem('carritoHuerta')) || [];
    const idx = carrito.findIndex(p => p.id === productoSeleccionado.id);
    if (idx >= 0) {
        carrito[idx].cantidad += cantidad;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad });
    }
    localStorage.setItem('carritoHuerta', JSON.stringify(carrito));
    cerrarModalCantidad();
    actualizarContadorCarrito();
}

/**
 * Actualiza el contador visual de productos distintos en el menú
 */
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoHuerta')) || [];
    let total = carrito.length; // cantidad de productos distintos
    let contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = total > 0 ? total : '';
    }
}

window.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

/**
 * Muestra los productos del carrito en la tabla de carrito.html
 * Busca el precio real en tienda.html por nombre para mostrar el precio correcto
 */
function mostrarCarritoEnTabla() {
    const carrito = JSON.parse(localStorage.getItem('carritoHuerta')) || [];
    const tbody = document.querySelector('#tabla-carrito tbody');
    const totalSpan = document.getElementById('total-carrito');
    tbody.innerHTML = '';
    let totalGeneral = 0;
    carrito.forEach(producto => {
        // Buscar el precio real en la tienda por nombre
        let precioUnitario = 0;
        let cards = document.querySelectorAll('.producto-card-tienda');
        for (let card of cards) {
            let nombre = card.querySelector('h3');
            let precio = card.querySelector('.precio');
            if (nombre && precio && nombre.textContent === producto.nombre) {
                let match = precio.textContent.match(/\$([\d\.]+)/);
                if (match) {
                    // Si el precio tiene punto, es miles (ej: 1.180 → 1180)
                    precioUnitario = parseFloat(match[1].replace(/\./g, ''));
                }
                break;
            }
        }
        // Si no se encontró en la tienda, usar el precio guardado
        if (!precioUnitario) {
            if (typeof producto.precio === 'string') {
                let match = producto.precio.toString().match(/([\d\.]+)/);
                precioUnitario = match ? parseFloat(match[1].replace(/\./g, '')) : 0;
            } else {
                precioUnitario = producto.precio;
            }
        }
        // Si el precio es menor a 1000, se asume que es miles y se multiplica
        if (precioUnitario < 1000) {
            precioUnitario = precioUnitario * 1000;
        }
        let total = precioUnitario * producto.cantidad;
        totalGeneral += total;
        // Crear fila en la tabla
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width:40px;vertical-align:middle;margin-right:8px;">${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${precioUnitario.toLocaleString('es-CL')}</td>
            <td>$${total.toLocaleString('es-CL')}</td>
            <td><button onclick="eliminarDelCarrito(${producto.id})">🗑️</button></td>
        `;
        tbody.appendChild(tr);
    });
    totalSpan.textContent = totalGeneral.toLocaleString('es-CL');
}

/**
 * Elimina un producto del carrito por su id
 */
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carritoHuerta')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carritoHuerta', JSON.stringify(carrito));
    mostrarCarritoEnTabla();
    actualizarContadorCarrito();
}

// Si estamos en carrito.html, mostrar la tabla al cargar
if (document.getElementById('tabla-carrito')) {
    window.addEventListener('DOMContentLoaded', mostrarCarritoEnTabla);
}

// =====================
// PERFIL USUARIO
// =====================

function mostrarPerfil() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual')) || {};
    document.getElementById('perfil-usuario').textContent = usuario.nombre || '';
    document.getElementById('perfil-correo').textContent = usuario.correo || '';
    // Foto de perfil
    const foto = localStorage.getItem('fotoPerfil');
    const img = document.getElementById('perfil-foto');
    if (img) {
        if (foto) {
            img.src = foto;
        } else {
            img.src = 'img/perfil-default.png';
        }
    }
}

// Mostrar datos al cargar perfil.html
if (document.getElementById('perfil-usuario')) {
    window.addEventListener('DOMContentLoaded', mostrarPerfil);
}

// Mostrar formulario de edición
const btnEditar = document.getElementById('editar-perfil');
if (btnEditar) {
    btnEditar.addEventListener('click', function() {
        const usuario = JSON.parse(localStorage.getItem('usuarioActual')) || {};
        document.getElementById('nombre').value = usuario.nombre || '';
        document.getElementById('correo').value = usuario.correo || '';
        document.getElementById('perfil-info').style.display = 'none';
        document.getElementById('perfil-form').style.display = 'block';
    });
}

// Cancelar edición
const btnCancelar = document.getElementById('cancelar-edicion');
if (btnCancelar) {
    btnCancelar.addEventListener('click', function() {
        document.getElementById('perfil-form').style.display = 'none';
        document.getElementById('perfil-info').style.display = 'block';
    });
}

// Guardar cambios de perfil
const formPerfil = document.getElementById('perfil-form');
if (formPerfil) {
    formPerfil.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        // Guardar foto si se subió
        const fotoInput = document.getElementById('foto');
        if (fotoInput.files && fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                localStorage.setItem('fotoPerfil', evt.target.result);
                actualizarPerfil(nombre, correo);
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            actualizarPerfil(nombre, correo);
        }
    });
}

function actualizarPerfil(nombre, correo) {
    localStorage.setItem('usuarioActual', JSON.stringify({ nombre, correo }));
    mostrarPerfil();
    document.getElementById('perfil-form').style.display = 'none';
    document.getElementById('perfil-info').style.display = 'block';
}