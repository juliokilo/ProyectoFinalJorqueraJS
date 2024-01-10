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
            participantes = data.participantes;
            localStorage.setItem('participantes', JSON.stringify(participantes));
        })
        .catch(error => {
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
    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    let formatoTelefonoArgentino = /^(\+?54)?(0)?[1-9]{2,4} ?-?[1-9]{6,8}$/.test(telefono);

    if (nombre === '') {
        mostrarError('Por favor, ingrese un nombre.');
        return;
    } else if (contieneNumeros) {
        mostrarError('El nombre no debe contener números.');
        return;
    }

    if (correo === '') {
        mostrarError('Por favor, ingrese un correo electrónico.');
        return;
    } else if (!formatoCorreo) {
        mostrarError('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    if (edad === '') {
        mostrarError('Por favor, ingrese una edad.');
        return;
    } else if (isNaN(parseInt(edad)) || parseInt(edad) <= 0 || parseInt(edad) < 18) {
        mostrarError('Por favor, ingrese una edad válida (número mayor a 0 y mayor o igual a 18).');
        return;
    }

    if (telefono === '') {
        mostrarError('Por favor, ingrese un número de teléfono.');
        return;
    } else if (!formatoTelefonoArgentino) {
        mostrarError('Por favor, ingrese un número de teléfono argentino válido.');
        return;
    }

    let participante = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        edad: edad
    };

    let participantesGuardados = JSON.parse(localStorage.getItem('participantes')) || [];
    participantesGuardados.push(participante);
    localStorage.setItem('participantes', JSON.stringify(participantesGuardados));

    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: '¡Felicidades, usted está inscrito!',
        confirmButtonText: 'Aceptar'
    });

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("edad").value = "";
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonText: 'Aceptar'
    });
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