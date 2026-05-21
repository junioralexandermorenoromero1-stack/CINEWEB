/**
 * ========================================================================
 * ARQUITECTURA DEL PROYECTO - CINEWEB COLABORATIVO (MÉTODO ABP)
 * Desarrollador: Junior Moreno Romero
 * Lógica: Uso de Arrays, Objetos y LocalStorage para persistencia de datos.
 * ========================================================================
 */

// 1. BASE DE DATOS INICIAL (Las 4 películas de Avengers predeterminadas)
const peliculasPredeterminadas = [
    { titulo: "Avengers: Endgame", director: "Anthony y Joe Russo", sinopsis: "El universo está en ruinas. Los Vengadores se reúnen para intentar deshacer las acciones de Thanos.", img: "assets/img/01.webp" },
    { titulo: "Avengers: Era de Ultrón", director: "Joss Whedon", sinopsis: "Tony Stark intenta reactivar un programa de paz, pero surge el temible y destructivo Ultrón.", img: "assets/img/02.webp" },
    { titulo: "Avengers: Infinity War", director: "Anthony y Joe Russo", sinopsis: "Los superhéroes se alían para sacrificarlo todo e intentar derrotar al poderoso Thanos.", img: "assets/img/03.webp" },
    { titulo: "The Avengers", director: "Joss Whedon", sinopsis: "Nick Fury une a los héroes más poderosos de la Tierra para defender al mundo de Loki.", img: "assets/img/04.webp" }
];

// Evento disparador: Al cargar por completo el DOM, renderiza las listas guardadas
document.addEventListener("DOMContentLoaded", function() {
    inicializarPeliculas();
    mostrarComentarios();
});

/**
 * FUNCIÓN: Inicializa la cartelera uniendo los datos base con los del LocalStorage
 */
function inicializarPeliculas() {
    const catalogo = document.getElementById("catalogoPeliculas");
    if (!catalogo) return; // Validador de seguridad si se ejecuta en páginas secundarias

    // Extraemos películas guardadas por el usuario en formato JSON string
    let peliculasCreadas = JSON.parse(localStorage.getItem("misPeliculas")) || [];
    
    // Fusionamos ambos arreglos usando el operador Spread (...)
    let todasLasPelis = [...peliculasPredeterminadas, ...peliculasCreadas];
    
    catalogo.innerHTML = ""; // Limpieza de control de la rejilla

    // Inyección dinámica mediante bucle forEach
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
 * FUNCIÓN: Permite a los usuarios subir nuevas películas y describirlas
 */
function agregarPelicula(event) {
    event.preventDefault(); // Bloquea la recarga de página por defecto del formulario

    const titulo = document.getElementById("peliTitulo").value.trim();
    const director = document.getElementById("peliDirector").value.trim();
    const sinopsis = document.getElementById("peliSinopsis").value.trim();
    
    // Poster genérico de marcador para las películas añadidas por la comunidad
    const imgPorDefecto = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";

    // Instancia del nuevo objeto estructurado
    const nuevaPeli = { titulo: titulo, director: director, sinopsis: sinopsis, img: imgPorDefecto };

    // Agregamos el objeto al registro local persistente
    let peliculasCreadas = JSON.parse(localStorage.getItem("misPeliculas")) || [];
    peliculasCreadas.push(nuevaPeli);
    localStorage.setItem("misPeliculas", JSON.stringify(peliculasCreadas));

    // Actualización reactiva de la UI
    inicializarPeliculas();
    document.getElementById("formNuevaPeli").reset(); 
    alert("¡Excelente! Tu película y descripción se agregaron con éxito al catálogo público.");
}

/**
 * FUNCIÓN: Registra y guarda las críticas o comentarios en vivo en la base de datos local
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
 * FUNCIÓN: Lee el LocalStorage y renderiza la caja de comentarios del foro
 */
function mostrarComentarios() {
    const contenedor = document.getElementById("listaComentarios");
    if (!contenedor) return;

    let lista = JSON.parse(localStorage.getItem("comentariosCine")) || [];
    contenedor.innerHTML = "";

    // Muestra las críticas en orden cronológico inverso (los más nuevos primero)
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
 * CONTROLADORES LOGICOS: Validaciones de acceso a los formularios
 */
function validarLogin(event) {
    if(event) event.preventDefault();
    var usuario = document.getElementById("usuario").value.trim();
    var pass = document.getElementById("password").value.trim();

    if (usuario === "" || pass === "") {
        alert("Por favor, complete todas las credenciales de ingreso.");
        return false;
    }
    alert("Inicio de sesión simulado con éxito.");
    window.location.href = "index.html";
    return false;
}

function validarRegistro(event) {
    if(event) event.preventDefault();
    var nombre = document.getElementById("nombre").value.trim();
    var edad = document.getElementById("edad").value;

    if (nombre === "" || edad === "") {
        alert("Todos los campos de registro son obligatorios.");
        return false;
    }
    
    // Regla de Negocio: Restricción estructural de rango de edad admisible
    if (edad < 10 || edad > 85) {
        alert("Registro rechazado: La edad debe estar entre los 10 y los 85 años.");
        return false;
    }
    
    alert("¡Registro completado con éxito! Inicia sesión para continuar.");
    window.location.href = "login.html";
    return false;
}
