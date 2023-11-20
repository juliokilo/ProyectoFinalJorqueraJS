
let participantes = []

while (true) {
    let nombre = prompt("Ingrese su nombre completo:")
    let correo = prompt("Ingrese el correo electrónico")
    let telefono = parseInt(prompt("Ingrese su número de teléfono"))
let edad = parseInt(prompt("Ingrese su edad"))

if (nombre && edad && correo) {
    if (edad >= 18) {
    console.log("Felicidades, usted cumple con los requisitos y está inscrito")
    alert("Felicidades, usted cumple con los requisitos y está inscrito")

    let participante = {nombre: nombre, correo: correo, telefono: telefono, edad: edad}
    participantes.push(participante)
    
    console.log("Estás inscripto, ¡felicidades!")
    alert("Estás inscripto, ¡felicidades!")
    console.log("Participantes inscritos:")
    console.log(participantes)
    
    break;
    } else {
    console.log("Lamentablemente debe ser mayor de 18 años para inscribirse")
    alert("Lamentablemente debe ser mayor de 18 años para inscribirse")
    }
    } else {
    console.log("Por favor, complete todos los campos del formulario")
    alert("Por favor, complete todos los campos del formulario")
}
}
let nombreBusqueda = prompt("Ingrese el nombre del participante que desea buscar:");
let participanteEncontrado = participantes.find((participante) => {
    return participante.nombre.toUpperCase() === nombreBusqueda.toUpperCase();
});

if (participanteEncontrado) {
    console.log("Participante encontrado:");
    alert("nombre:"+participanteEncontrado.nombre+"correo:"+participanteEncontrado.correo+"Teléfono:"+participanteEncontrado.telefono+"Edad:"+participanteEncontrado.edad)
    console.table({Nombre: participanteEncontrado.nombre,Correo: participanteEncontrado.correo,Teléfono: participanteEncontrado.telefono,Edad: participanteEncontrado.edad})
} else {
    console.log("No se encontró ningún participante con ese nombre.");
    alert("No se encontró ningún participante con ese nombre.");
}

let participantesMayores = participantes.filter((participante)=> {
    return participante.edad > 18
})

console.log("Participantes mayores de 18 años:")
console.log(participantesMayores)
