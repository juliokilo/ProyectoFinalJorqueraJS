let participantes = [];

function guardarParticipante() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let telefono = parseInt(document.getElementById("telefono").value);
    let edad = parseInt(document.getElementById("edad").value);

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
    let nombreBusqueda = document.getElementById("buscarNombre").value;
    let participantesGuardados = JSON.parse(localStorage.getItem('participantes')) || [];

    let participanteEncontrado = participantesGuardados.find((participante) => {
        return participante.nombre.toUpperCase() === nombreBusqueda.toUpperCase();
    });

    if (participanteEncontrado) {
        let resultado = document.getElementById("resultado");
        resultado.innerHTML = `<p>Nombre: ${participanteEncontrado.nombre}</p>
                                <p>Correo: ${participanteEncontrado.correo}</p>
                                <p>Teléfono: ${participanteEncontrado.telefono}</p>
                                <p>Edad: ${participanteEncontrado.edad}</p>`;
    } else {
        document.getElementById("resultado").innerText = "No se encontró ningún participante con ese nombre.";
    }
}