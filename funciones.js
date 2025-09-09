// Función para manejar el inicio de sesión
function iniciarSesion() {

    // Obtener los valores de los campos de entrada
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    while (true) {

        // Limpiar mensajes de error
        document.getElementById("errorUsuario").textContent = "";
        document.getElementById("errorContrasena").textContent = "";
        document.getElementById("errorGeneral").textContent = "";
        
        // Validar usuario y contraseña
        if (usuario === "admin" && contrasena === "1234") {
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html";
            return true;
        } else if (usuario !== "admin") {
            document.getElementById("errorUsuario").textContent = "Usuario incorrecto";
            return false;
        } else if (contrasena !== "1234") {
            document.getElementById("errorContrasena").textContent = "Contraseña incorrecta";
            return false;
        } else if (usuario !== "admin" && contrasena !== "1234") {
            document.getElementById("errorGeneral").textContent = "El usuario o la contraseña son incorrectos";
            return false;        
        } else if (usuario === "" && contrasena === "") {
            document.getElementById("errorGeneral").textContent = "Por favor, ingrese el usuario y la contraseña";
            return false;        
        } else if (usuario === "") {
            document.getElementById("errorUsuario").textContent = "Por favor, ingrese el usuario";
            return false;        
        } else if (contrasena === "") {
            document.getElementById("errorContrasena").textContent = "Por favor, ingrese la contraseña";
            return false;
        }
    }
}