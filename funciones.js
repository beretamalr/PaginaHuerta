// Función para manejar el inicio de sesión tradicional
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Limpiar mensajes de error
    document.getElementById("errorUsuario").textContent = "";
    document.getElementById("errorContrasena").textContent = "";
    document.getElementById("errorGeneral").textContent = "";
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (usuarioRegistrado && usuarioRegistrado.nombre === usuario && usuarioRegistrado.contrasena === contrasena) {
        alert("Inicio de sesión exitoso");
        guardarDatosUsuario(usuarioRegistrado.nombre, usuarioRegistrado.correo);
        window.location.href = "index2.html";
        return true;
    }
    
    // Validar usuario y contraseña
    if (usuario === "admin" && contrasena === "1234") {
        alert("Inicio de sesión exitoso");
        guardarDatosUsuario(usuario, "admin@ejemplo.com");
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

//Funcion para registrar un usuario
function registrarUsuario() {
    const nombre = document.getElementById('nuevo-usuario').value;
    const correo = document.getElementById('nuevo-correo').value;
    const contrasena = document.getElementById('nueva-contrasena').value;

    // Guardar los datos en localStorage (puedes usar un objeto para varios usuarios)
    const usuario = { nombre, correo, contrasena };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));

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

// Puedes dejar las funciones de Facebook y Microsoft igual
function loginConFacebook() {
    alert("Función de Facebook no implementada");
}

function loginConMicrosoft() {
    alert("Función de Microsoft no implementada");
}

function guardarDatosUsuario(nombre, correo) {
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("correoUsuario", correo);
}

function onGoogleSignIn(googleUser) {
    const data = parseJwt(googleUser.credential);
    guardarDatosUsuario(data.name, data.email);
    window.location.href = "index2.html";
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', function() {
    const nombre = localStorage.getItem('nombreUsuario');
    const correo = localStorage.getItem('correoUsuario');
    // Solo intenta mostrar si existen los elementos en la página
    const nombreElem = document.getElementById('perfil-usuario');
    const correoElem = document.getElementById('perfil-correo');
    if (nombreElem && correoElem && nombre && correo) {
        nombreElem.textContent = nombre;
        correoElem.textContent = correo;
    }
});