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