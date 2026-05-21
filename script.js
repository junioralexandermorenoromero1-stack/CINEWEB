/**
 * ========================================================================
 * ARQUITECTURA DEL PROYECTO - CINEWEB COLABORATIVO (MÉTODO ABP)
 * Desarrollador: Junior Moreno Romero
 * Lógica: Uso de Arrays, Objetos y LocalStorage para persistencia de datos.
 * ========================================================================
 */

// 1. BASE DE DATOS INICIAL (Las 4 películas base requeridas por el estudiante)
const peliculasPredeterminadas = [
    { titulo: "Avengers: Endgame", director: "Anthony y Joe Russo", sinopsis: "El universo está en ruinas. Los Vengadores se reúnen para intentar deshacer las acciones de Thanos.", img: "assets/img/01.webp" },
    { titulo: "Avengers: Age of Ultron", director: "Joss Whedon", sinopsis: "Tony Stark intenta reactivar un programa de paz, pero surge el temible Ultrón.", img: "assets/img/02.webp" },
    { titulo: "Avengers: Infinity War", director: "Anthony y Joe Russo", sinopsis: "Los superhéroes se alían para sacrificarlo todo e intentar derrotar al poderoso Thanos.", img: "assets/img/03.webp" },
    { titulo: "The Avengers", director: "Joss Whedon", sinopsis: "Nick Fury une a los héroes más poderosos de la Tierra para defender al mundo de Loki.", img: "assets/img/04.webp" }
];

// Al cargar el documento, inicializamos las películas y comentarios guardados
document.addEventListener("DOMContentLoaded", function() {
    inicializarPeliculas();
    mostrarComentarios();
});

/**
 * FUNCIÓN: Inicializa la cartelera mezclando las fijas con las que agregue el usuario
 */
function inicializarPeliculas() {
    const catalogo = document.getElementById("catalogoPeliculas");
    if (!catalogo) return; // Evita errores si se ejecuta en login/registro

    // Intentamos recuperar películas creadas por el usuario desde el almacenamiento local
    let peliculasCreadas = JSON.parse(localStorage.getItem("misPeliculas")) || [];
    
    // Combinamos las fijas de Avengers con las nuevas
    let todasLasPelis = [...peliculasPredeterminadas, ...peliculasCreadas];
    
    catalogo.innerHTML = ""; // Limpiamos el contenedor

    // Inyectamos dinámicamente cada tarjeta en el HTML semántico
    todasLasPelis.forEach(peli => {
        catalogo.innerHTML += `
            <div class="card">
                <img src="${peli.img}" alt="${peli.titulo}">
                <div class="info">
                    <h3>${peli.titulo}</h3>
                    <p><strong>Director:</strong> ${peli.director}</p>
                    <p><strong>Reseña:</strong> ${peli.sinopsis}</p>
                </div>
            </div>
        `;
    });
}

/**
 * FUNCIÓN: Permite subir/agregar nuevas películas y describirlas
 */
function agregarPelicula(event) {
    event.preventDefault(); // Detiene la recarga de página

    const titulo = document.getElementById("peliTitulo").value.trim();
    const director = document.getElementById("peliDirector").value.trim();
    const sinopsis = document.getElementById("peliSinopsis").value.trim();
    // Imagen por defecto tipo poster genérico para las películas agregadas por la comunidad
    const imgPorDefecto = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";

    // Creamos la estructura del nuevo objeto película
    const nuevaPeli = { titulo: titulo, director: director, sinopsis: sinopsis, img: imgPorDefecto };

    // Extraemos las películas que ya existan, sumamos la nueva y guardamos en localStorage
    let peliculasCreadas = JSON.parse(localStorage.getItem("misPeliculas")) || [];
    peliculasCreadas.push(nuevaPeli);
    localStorage.setItem("misPeliculas", JSON.stringify(peliculasCreadas));

    // Refrescamos la cartelera e interfaz de inmediato
    inicializarPeliculas();
    document.getElementById("formNuevaPeli").reset(); // Limpia campos
    alert("¡Excelente! Tu película y descripción se agregaron con éxito al catálogo público.");
}

/**
 * FUNCIÓN: Permite agregar comentarios/críticas en tiempo real
 */
function agregarComentario(event) {
    event.preventDefault();
    
    const autor = document.getElementById("autorComentario").value.trim();
    const texto = document.getElementById("textoComentario").value.trim();

    const nuevoComentario = { usuario: autor, mensaje: texto };

    let lista = JSON.parse(localStorage.getItem("comentariosCine")) || [];
    lista.push(nuevoComentario);
    localStorage.setItem("comentariosCine", JSON.stringify(lista));

    mostrarComentarios();
    document.getElementById("formComentario").reset();
}

/**
 * FUNCIÓN: Renderiza los comentarios almacenados en LocalStorage
 */
function mostrarComentarios() {
    const contenedor = document.getElementById("listaComentarios");
    if (!contenedor) return;

    let lista = JSON.parse(localStorage.getItem("comentariosCine")) || [];
    contenedor.innerHTML = "";

    // Los mostramos en orden inverso (el más reciente arriba)
    lista.reverse().forEach(c => {
        contenedor.innerHTML += `
            <div class="comentario-item">
                <strong>👤 @${c.usuario}:</strong>
                <p>"${c.mensaje}"</p>
            </div>
        `;
    });
}

/**
 * VALIDACIONES DE INGRESO Y REGISTRO (LOGICAL CONTROLS)
 */
function validarLogin(event) {
    if(event) event.preventDefault();
    var usuario = document.getElementById("usuario").value.trim();
    var pass = document.getElementById("password").value.trim();

    if (usuario === "" || pass === "") {
        alert("Complete las credenciales.");
        return false;
    }
    alert("Simulación de ingreso exitosa.");
    window.location.href = "index.html";
    return false;
}

function validarRegistro(event) {
    if(event) event.preventDefault();
    var nombre = document.getElementById("nombre").value.trim();
    var edad = document.getElementById("edad").value;

    if (nombre === "" || edad === "") {
        alert("Complete todos los campos de registro.");
        return false;
    }
    if (edad < 10 || edad > 8) {
        if(edad < 10 || edad > 85) {
            alert("Rango de edad no permitido.");
            return false;
        }
    }
    alert("Registro completado con éxito.");
    window.location.href = "login.html";
    return false;
}
