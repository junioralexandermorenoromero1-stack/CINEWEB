function VerPelicula(nombre) {
    var peliculas = {
        endgame: {
            titulo: "Avengers: Endgame",
            año: 2019,
            genero: "Ciencia ficción / Acción",
            sinopsis: "El universo está en ruinas. Los Vengadores restantes se reúnen una vez más para intentar deshacer las acciones de Thanos."
        },
        ultron: {
            titulo: "Avengers: Era de Ultrón",
            año: 2015,
            genero: "Ciencia ficción / Acción",
            sinopsis: "Tony Stark intenta reactivar un programa de paz, pero las cosas se complican cuando surge el temible Ultrón."
        },
        infinity: {
            titulo: "Avengers: Infinity War",
            año: 2018,
            genero: "Ciencia ficción / Acción",
            sinopsis: "Los superhéroes se alían para sacrificarlo todo e intentar derrotar al poderoso Thanos antes de que destruya el universo."
        },
        theavengers: {
            titulo: "The Avengers",
            año: 2012,
            genero: "Ciencia ficción / Acción",
            sinopsis: "Nick Fury une a los héroes más poderosos de la Tierra para defender al mundo de Loki y su ejército invasor."
        }
    };

    var peli = peliculas[nombre];
    var contenedor = document.getElementById("infoPeliculas");

    if (peli) {
        contenedor.style.display = "block";
        contenedor.innerHTML = "<h3>" + peli.titulo + "</h3>" +
                               "<p><strong>Año:</strong> " + peli.año + "</p>" +
                               "<p><strong>Género:</strong> " + peli.genero + "</p>" +
                               "<p><strong>Sinopsis:</strong> " + peli.sinopsis + "</p>" +
                               "<button onclick=\"document.getElementById('infoPeliculas').style.display='none'\" style='margin-top:15px; background-color:#333; margin-left:0;'>Cerrar Info</button>";
        contenedor.scrollIntoView({ behavior: 'smooth' });
    }
}

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