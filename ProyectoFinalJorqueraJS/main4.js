let participantes = [];

function cargarDatosDesdeJSON() {
    fetch('participantes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            participantes = data;
            console.log(participantes);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = function() {
    cargarDatosDesdeJSON();
};

function guardarParticipante() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let edad = document.getElementById("edad").value;

    let contieneNumeros = /\d/.test(nombre);

    if (contieneNumeros) {
        document.getElementById("mensaje").innerText = "El nombre no debe contener números";
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!formatoCorreo) {
        document.getElementById("mensaje").innerText = "Por favor, ingrese un correo electrónico válido";
        return;
    }

    if (isNaN(parseInt(edad)) || parseInt(edad) <= 0) {
        document.getElementById("mensaje").innerText = "Por favor, ingrese una edad válida (número mayor a 0)";
        return;
    }
    edad = parseInt(edad);

    let formatoTelefonoArgentino = /^(\+?54)?(0)?[1-9]{2,4} ?-?[1-9]{6,8}$/.test(telefono);

    if (!formatoTelefonoArgentino) {
        document.getElementById("mensaje").innerText = "Por favor, ingrese un número de teléfono argentino válido";
        return;
    }

    telefono = parseInt(telefono.replace(/\D/g, ''));

    if (nombre && edad && correo) {
        if (edad >= 18) {
            let participante = { nombre: nombre, correo: correo, telefono: telefono, edad: edad };
            participantes.push(participante);
            localStorage.setItem('participantes', JSON.stringify(participantes));
            document.getElementById("mensaje").innerText = "¡Felicidades, usted está inscrito!";
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("edad").value = "";
        } else {
            document.getElementById("mensaje").innerText = "Lamentablemente debe ser mayor de 18 años para inscribirse";
        }
    } else {
        document.getElementById("mensaje").innerText = "Por favor, complete todos los campos del formulario";
    }
}

function buscarParticipante() {
    let nombreBusqueda = document.getElementById("buscarNombre").value.toLowerCase();

    let participantesGuardados = JSON.parse(localStorage.getItem('participantes')) || [];

    let participantesEncontrados = participantesGuardados.filter((participante) => {
        return participante.nombre.toLowerCase().includes(nombreBusqueda);
    });

    if (participantesEncontrados.length > 0) {
        let resultado = document.getElementById("resultado");
        resultado.innerHTML = "";

        participantesEncontrados.forEach((participanteEncontrado) => {
            resultado.innerHTML += `<p>Nombre: ${participanteEncontrado.nombre}</p>
                                    <p>Correo: ${participanteEncontrado.correo}</p>
                                    <p>Teléfono: ${participanteEncontrado.telefono}</p>
                                    <p>Edad: ${participanteEncontrado.edad}</p><br>`;
        });
    } else {
        document.getElementById("resultado").innerText = "No se encontraron participantes con ese nombre.";
    }
}