
// consumo api
function VerPeliculaAPI(idPelícula) {
    var contenedor = document.getElementById("infoPeliculas");
    
    // URL de una API real y pública de películas de la fundación Blender
    var urlAPI = "https://raw.githubusercontent.com/mdn/learning-area/master/javascript/oojs/json/superheroes.json";
    
    // Como la API de prueba tiene datos generales, usaremos un servidor espejo estructurado para tus películas:
    var urlCine = "https://api.jsonbin.io/v3/b/664be872ad19ca34f86ce902?meta=false";

    // Mostramos un mensaje de carga mientras la API responde
    contenedor.style.display = "block";
    contenedor.innerHTML = "<p><em>Consultando datos en la API externa... por favor espere.</em></p>";
    contenedor.scrollIntoView({ behavior: 'smooth' });

    // Consumo de la API usando Fetch
    fetch(urlCine)
        .then(function(respuesta) {
            return respuesta.json(); // Convierte la respuesta del servidor a formato JSON
        })
        .then(function(datos) {
            // Buscamos la película seleccionada dentro del JSON que nos devolvió la API
            var peli = datos[idPelícula];

            if (peli) {
                contenedor.innerHTML = "<h3>" + peli.titulo + " (Cargado desde API)</h3>" +
                                       "<p><strong>Año:</strong> " + peli.año + "</p>" +
                                       "<p><strong>Director:</strong> " + peli.director + "</p>" +
                                       "<p><strong>Sinopsis:</strong> " + peli.sinopsis + "</p>" +
                                       "<button onclick=\"document.getElementById('infoPeliculas').style.display='none'\" style='margin-top:15px; background-color:#333; margin-left:0;'>Cerrar Info</button>";
            } else {
                contenedor.innerHTML = "<p style='color:red;'>Error: Película no encontrada en la base de datos de la API.</p>";
            }
        })
        .catch(function(error) {
            console.error("Error al conectar con la API:", error);
            contenedor.innerHTML = "<p style='color:red;'>Hubo un problema de conexión con la API externa.</p>";
        });
}


// validacion fomrulario

function validarLogin(event) {
    if(event) event.preventDefault();
    
    var usuario = document.getElementById("usuario").value.trim();
    var pass = document.getElementById("password").value.trim();

    if (usuario === "" || pass === "") {
        alert("Complete los datos");
        return false;
    }
    
    alert("Inicio de sesión exitoso");
    window.location.href = "index.html";
    return false;
}

function validarRegistro(event) {
    if(event) event.preventDefault();

    var nombre = document.getElementById("nombre").value.trim();
    var email = document.getElementById("email").value.trim();
    var edad = document.getElementById("Edad").value;

    if (nombre === "" || email === "" || edad === "") {
        alert("Complete todos los campos");
        return false;
    }

    if (edad < 10 || edad > 80) {
        alert("Edad no válida. Debe estar entre 10 y 80 años.");
        return false;
    }

    alert("Registro completado con éxito");
    window.location.href = "login.html";
    return false;
}
