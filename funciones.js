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

// Puedes dejar las funciones de Facebook y Microsoft igual
function loginConFacebook() {
    alert("Función de Facebook no implementada");
}

function loginConMicrosoft() {
    alert("Función de Microsoft no implementada");
}