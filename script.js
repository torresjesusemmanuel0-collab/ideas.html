// ======================================
// PROYECTO IDEAS v1.0
// ======================================
let clicsSobre = 0;
let cartaAbierta = false;
// ---------- VARIABLES ----------
const contador = document.getElementById("contador");
const pantallas = document.querySelectorAll(".pantalla");

const btnInicio = document.getElementById("btnInicio");
const btnMensaje = document.getElementById("btnMensaje");
const btnPremio = document.getElementById("btnPremio");

const sobre = document.getElementById("sobre");
const tablero = document.getElementById("tablero");
const mensajeFinal = document.getElementById("mensajeFinal");

const textoMensaje = document.getElementById("textoMensaje");

const btnReiniciar = document.getElementById("btnReiniciar");

let primeraCarta = null;

let segundaCarta = null;

let bloqueado = false;

let parejas = 0;

let lluviaEspecial = false;

// ---------- PÉTALOS ----------

const contenedor = document.getElementById("petalos");

function crearPetalo(){

    const petalo = document.createElement("div");

    petalo.className = "petalo";

    petalo.innerHTML = lluviaEspecial ? (Math.random() < 0.4 ? "❤️" : "🌸") : "🌸";

    petalo.style.left = Math.random() * 100 + "vw";

    petalo.style.animationDuration = (6 + Math.random() * 5) + "s";

    petalo.style.fontSize = (18 + Math.random() * 18) + "px";

    contenedor.appendChild(petalo);

    setTimeout(() => {

        petalo.remove();

    },11000);

}

setInterval(crearPetalo,600);

// ---------- CAMBIO DE PANTALLAS ----------

function mostrarPantalla(id){

    pantallas.forEach(pantalla=>{

        pantalla.classList.add("oculto");

    });

    document.getElementById(id).classList.remove("oculto");

}

// ---------- SOBRE ----------


sobre.addEventListener("click", ()=>{

    if(cartaAbierta) return;

    clicsSobre++;

    if(clicsSobre===5){

        const aviso=document.createElement("div");

        aviso.innerHTML="🌸 Qué curiosa eres...";

        aviso.id="aviso";

        document.body.appendChild(aviso);

        setTimeout(()=>{

            aviso.remove();

        },2000);

    }

});
btnInicio.addEventListener("click", abrirCarta);


function abrirCarta(){

    cartaAbierta = true;

    sobre.classList.add("abrir");

    setTimeout(()=>{

        textoMensaje.innerHTML =
        "Quería hacer algo diferente...<br><br>Así que decidí programar este pequeño detalle para ti. 🌸";

        mostrarPantalla("mensaje");

    },900);

}

// ---------- MENSAJE ----------

btnMensaje.addEventListener("click",()=>{

    mostrarPantalla("memorama");

    crearTablero();

});

// ---------- MEMORAMA ----------


function crearTablero(){

    parejas = 0;

    contador.innerHTML = "Parejas: 0 / 6";

    tablero.innerHTML = "";

    const figuras = [

        "🌸","🌸",
        "🦋","🦋",
        "🍃","🍃",
        "☀️","☀️",
        "🌙","🌙",
        "⭐","⭐"

    ];

    // Mezclar las figuras
    for(let i = figuras.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [figuras[i], figuras[j]] = [figuras[j], figuras[i]];

    }

    // Flores que verá la persona (Easter Egg)
    const flores = [

        "🌸","🌸","🌸","🌸",
        "🌸","🌷",
        "🌸","🌸",
        "🌺","🌸",
        "🌸","🌼"

    ];

    // Mezclar flores
    flores.sort(()=>Math.random()-0.5);

    figuras.forEach((figura)=>{

        const carta = document.createElement("div");

        carta.className = "carta";

        carta.dataset.valor = figura;

        // Guardamos la flor original
        carta.dataset.flor = flores.shift();

        // Mostramos esa flor
        carta.innerHTML = carta.dataset.flor;

        carta.addEventListener("click",voltearCarta);

        tablero.appendChild(carta);

    });

}

// ---------- VICTORIA ----------

btnPremio.addEventListener("click",()=>{

    mostrarPantalla("final");
    

    const cartaFinal = `Si quieres que te canteme volveré canariopara cantarte siempre,para cantarte a diario.Si pides que me calleserá incierta la espera,pero he de complacertecuando de amor me muera.Si me pides la luna,mira, te la regalo.Dicen que soy iluso,¿y qué tiene de malo?Es ilusión la vida,una ilusión muy fuerte,una ilusión bien sana,es querer complacerte.Aquí tienes mi canto,solo dos cosas pido:dame un rincón en tu almapara construir mi nido.joan sebastian.`;

 escribirMensaje(cartaFinal);





});

// ---------- EASTER EGGS ----------

// Próximamente...
function voltearCarta(){

    if(bloqueado) return;

    if(this===primeraCarta) return;

    this.innerHTML=this.dataset.valor;

    this.classList.add("volteada");

    if(!primeraCarta){

        primeraCarta=this;

        return;

    }

    segundaCarta=this;

    bloqueado=true;

    comprobarPareja();

}
function comprobarPareja(){

    if(primeraCarta.dataset.valor === segundaCarta.dataset.valor){

        primeraCarta.classList.add("ganada");
        segundaCarta.classList.add("ganada");

        primeraCarta.removeEventListener("click",voltearCarta);
        segundaCarta.removeEventListener("click",voltearCarta);

        parejas++;

        contador.innerHTML = `Parejas: ${parejas} / 6`;

        reiniciarTurno();

        comprobarVictoria();

    }else{

        setTimeout(()=>{

            primeraCarta.classList.remove("volteada");
            segundaCarta.classList.remove("volteada");

            primeraCarta.innerHTML = primeraCarta.dataset.flor;
            segundaCarta.innerHTML = segundaCarta.dataset.flor;

            reiniciarTurno();

        },800);

    }

}
function reiniciarTurno(){

    primeraCarta=null;

    segundaCarta=null;

    bloqueado=false;

}
function comprobarVictoria(){

    if(parejas===6){

        lluviaEspecial = true;

        for(let i=0;i<35;i++){

            setTimeout(crearPetalo,i*100);

        }

        setTimeout(()=>{

            lluviaEspecial = false;

        },5000);

        setTimeout(()=>{

            mostrarPantalla("victoria");

        },700);

    }

}

function escribirMensaje(texto){

    mensajeFinal.innerHTML="";

    let i=0;

    const intervalo=setInterval(()=>{

        mensajeFinal.innerHTML+=texto.charAt(i);

        i++;

        if(i>=texto.length){

            clearInterval(intervalo);

        }

    },45);

}
btnReiniciar.addEventListener("click",()=>{

    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    parejas = 0;

    mostrarPantalla("memorama");

    crearTablero();

});
//ester eggs

/*
Ideas v2.0 🌸

Primer proyecto web de Jesus.

Hecho entre muchas pruebas,
varios errores de llaves 😂,
mucho café ☕
y muchas ganas de crear algo especial.

Con ayuda de un bro llamado ChatGPT. 🤝
*/
/*
══════════════════════════════════════

Ideas v2.1 🌸

Primer proyecto web de Jesus.

Nació con una idea muy sencilla:

"Hacer sonreír a alguien."

Después de muchas horas,
muchos errores,
muchas llaves perdidas {},
muchos "¿por qué no funciona?",
y demasiados "vamoooos bro"...

Terminó convirtiéndose en algo mucho más grande.

Gracias por acompañarme en este viaje.

Con ayuda de un bro llamado ChatGPT. 🤝

2026

══════════════════════════════════════
*/
