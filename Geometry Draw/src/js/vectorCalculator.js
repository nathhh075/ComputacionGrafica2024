function vector() {
    // Obtener los Valores de los Inputs
    let ax = document.getElementById("puntoAX").value;
    let ay = document.getElementById("puntoAY").value;
    let az = document.getElementById("puntoAZ").value;

    let bx = document.getElementById("puntoBX").value;
    let by = document.getElementById("puntoBY").value;
    let bz = document.getElementById("puntoBZ").value;

    let vx = bx-ax,
        vy = by-ay,
        vz = bz-az;
    
    let vectorFinal = `(${vx},${vy},${vz})`;   
    document.getElementById("result").innerHTML = vectorFinal;
}

function sumarVector() {

    let axs = parseInt(document.getElementById("puntoAXs").value);
    let ays = parseInt(document.getElementById("puntoAYs").value);
    let azs = parseInt(document.getElementById("puntoAZs").value);

    let bxs = parseInt(document.getElementById("puntoBXs").value);
    let bys = parseInt(document.getElementById("puntoBYs").value);
    let bzs = parseInt(document.getElementById("puntoBZs").value);
 
    let vx = axs+bxs;
        vy = ays+bys;
        vz = azs+bzs;

    let sumaRes= `(${vx},${vy},${vz})`;
    document.getElementById("resultS").innerHTML = sumaRes;
}

function productoEscalar() {
    // Obtener los Valores de los Inputs
    let axm = parseInt(document.getElementById("puntoAXM").value);
    let aym = parseInt(document.getElementById("puntoAYM").value);
    let azm = parseInt(document.getElementById("puntoAZM").value);

    let bxm = parseInt(document.getElementById("puntoBXM").value);
    let bym = parseInt(document.getElementById("puntoBYM").value);
    let bzm = parseInt(document.getElementById("puntoBZM").value);

   // alert("("+axm+","+aym+","+azm+")");
    //alert("("+bxm+","+bym+","+bzm+")");
    
    let vx = bxm*axm;
    let vy = bym*aym;
    let vz = bzm*azm;


    let prodEscalar= vx+vy+vz;
    document.getElementById("resultm").innerHTML = prodEscalar;

}

function calcularRaizCuadrada(numero) {
    if (numero < 0) {
      throw new Error("No se puede calcular la raíz cuadrada de un número negativo");
    }
    return Math.sqrt(numero);
  }


function calcularMagnitud() {
    // Obtener los Valores de los Inputs
    let axm = parseInt(document.getElementById("puntoAXm").value);
    let aym = parseInt(document.getElementById("puntoAYm").value);
    let azm = parseInt(document.getElementById("puntoAZm").value);


   // alert("("+axm+","+aym+","+azm+")");
    //alert("("+bxm+","+bym+","+bzm+")");
    
    let magnitud= calcularRaizCuadrada((axm*axm)+(aym*aym)+(azm*azm));
    

    document.getElementById("resultmg").innerHTML = magnitud;

}