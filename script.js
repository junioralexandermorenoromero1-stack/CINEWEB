/*
 * consumo api

 */
function consultarAPI(tituloPelicula) {
    const display = document.getElementById("resultadoAPI");
    
    const apiKey = "394747ec"; 
    const url = `https://www.omdbapi.com/?t=${tituloPelicula}&apikey=${apiKey}`;

    display.style.display = "block";
    display.innerHTML = "<p style='color: #ccc; font-style: italic;'>Consultando bases de datos de la API externa... espere por favor.</p>";
    display.scrollIntoView({ behavior: 'smooth' });

  
    fetch(url)
        .then(function(respuesta) {
            return respuesta.json(); // Convierte los paquetes de red a JSON legible
        })
        .then(function(data) {
          
            if(data.Response === "True") {
          
                display.innerHTML = `
                    <div style="line-height: 1.6;">
                        <h2 style="color: #e50914; margin-top:0;">${data.Title} <span style='font-size:16px; color:#aaa;'>(Datos desde API Real)</span></h2>
                        <p><strong>Año de Estreno:</strong> ${data.Year}</p>
                        <p><strong>Director Técnico:</strong> ${data.Director}</p>
                        <p><strong>Elenco Principal:</strong> ${data.Actors}</p>
                        <p><strong>Sinopsis Oficial:</strong> ${data.Plot}</p>
                        <p><strong>Calificación Mundial:</strong> ⭐ <span style='color:#f39c12; font-weight:bold;'>${data.imdbRating} / 10</span></p>
                        <button onclick="cerrarCaja()" style="width: auto; background-color: #444; margin-top: 15px;">Cerrar Ficha Técnica</button>
                    </div>
                `;
            } else {
                display.innerHTML = "<p style='color: #e50914;'>Error: No se encontró registro de la película en el servidor API.</p>";
            }
        })
        .catch(function(error) {
            console.error("Fallo de red en API:", error);
            display.innerHTML = "<p style='color: #e50914;'>Error: Problema de conexión o restricciones de red con el servidor.</p>";
        });
}

/**
 * Cierra visualmente la sección de información técnica
 */
function cerrarCaja() {
    document.getElementById("resultadoAPI").style.display = "none";
}

/**
 * ========================================================================
 * FUNCIÓN 2: VALIDACIÓN LOCAL DEL FORMULARIO DE INICIO DE SESIÓN (LOGIN)
 * ========================================================================
 */
function validarLogin(event) {
    if(event) event.preventDefault(); // Evita que el formulario recargue la página incorrectamente
    
    var usuario = document.getElementById("usuario").value.trim();
    var pass = document.getElementById("password").value.trim();

    // Comprobación de campos vacíos
    if (usuario === "" || pass === "") {
        alert("Por favor, complete todas las credenciales de ingreso.");
        return false;
    }
    
    alert("Simulación de Inicio de Sesión Exitosa. ¡Bienvenido!");
    window.location.href = "index.html"; // Redirección limpia al home
    return false;
}

/**
 *validacion
 */
function validarRegistro(event) {
    if(event) event.preventDefault();

    var nombre = document.getElementById("nombre").value.trim();
    var email = document.getElementById("email").value.trim();
    var edad = document.getElementById("edad").value;

   
    if (nombre === "" || email === "" || edad === "") {
        alert("Todos los campos del formulario de afiliación son obligatorios.");
        return false;
    }

    if (edad < 10 || edad > 80) {
        alert("Registro denegado: La edad ingresada no es válida para el uso del sistema.");
        return false;
    }

    alert("¡Cuenta creada con éxito! Proceda a iniciar sesión.");
    window.location.href = "login.html";
    return false;
}
