//formulario de inscripcion//
//function formulario (){
    do{
    let aceptado;
    let nombre = prompt ("ingrese su nombre completo:");
    let correo = prompt ("Ingrese el correo electronico")
    let telefono = parseInt(prompt ("numero de telefono"));
    let edad = parseInt(prompt ("Ingrese su edad"));
    if (nombre && edad && correo) {
        if (edad >= 18) {
            console.log("Felicidades,Usted cumple con los requisitos y está inscrito");
            alert("Felicidades,Usted cumple con los requisitos y está inscrito");
        } else {
            console.log("lamentablemente debe ser mayor de 18 años para inscribirse");
            alert("lamentablemente debe ser mayor de 18 años para inscribirse");
        }
    } else {
        console.log("Por favor, complete todos los campos del formulario");
    alert("Por favor, complete todos los campos del formulario")
    }
    aceptado = confirm("Estás seguro que queres inscribirte?");
    if (aceptado){
    console.log("Estas inscripto felicidades")
    alert("Estas inscripto felicidades")
    }
    } while (aceptado
    
    //formulario()