/**
 * FUNCIÓN DE CONSUMO DE API (FETCH)
 * Objetivo: Resolver la problemática de falta de información técnica 
 * consultando un servidor externo (OMDb API).
 */
function consultarAPI(tituloPelicula) {
    const display = document.getElementById("resultadoAPI");
    const apiKey = "394747ec"; // API Key real de Jefferson para el proyecto
    const url = `https://www.omdbapi.com/?t=${tituloPelicula}&apikey=${apiKey}`;

    // Mostramos estado de carga
    display.style.display = "block";
    display.innerHTML = "<p>Cargando información desde el servidor externo...</p>";

    // Consumo asíncrono
    fetch(url)
        .then(response => response.json()) // Convertimos respuesta a JSON
        .then(data => {
            if(data.Response === "True") {
                // Inyectamos los datos dinámicos en el HTML
                display.innerHTML = `
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <h2 style="color: #e50914;">${data.Title}</h2>
                            <p><strong>Año:</strong> ${data.Year}</p>
                            <p><strong>Director:</strong> ${data.Director}</p>
                            <p><strong>Actores:</strong> ${data.Actors}</p>
                            <p><strong>Sinopsis:</strong> ${data.Plot}</p>
                            <p><strong>Rating:</strong> ⭐ ${data.imdbRating}</p>
                            <button onclick="cerrar()" style="width: auto; background: #555;">Cerrar Ficha</button>
                        </div>
                    </div>
                `;
                display.scrollIntoView({ behavior: 'smooth' });
            } else {
                display.innerHTML = "<p>Error: No se encontró información en la API.</p>";
            }
        })
        .catch(error => {
            console.error("Error API:", error);
            display.innerHTML = "<p>Error de conexión con el servidor.</p>";
        });
}

function cerrar() {
    document.getElementById("resultadoAPI").style.display = "none";
}

/** 
 * VALIDACIÓN DE FORMULARIO DE REGISTRO
 */
function validarRegistro(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;

    if(nombre === "" || edad === "") {
        alert("Por favor rellene todos los campos.");
        return;
    }

    if(edad < 12 || edad > 90) {
        alert("Edad no permitida para el sistema.");
        return;
    }

    alert("Usuario registrado con éxito en CINETOP.");
    window.location.href = "login.html";
}
