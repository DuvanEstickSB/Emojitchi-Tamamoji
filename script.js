let Nombre = "";
let Comida = 100;
let Salud = 100;
let Higiene = 100;
let Alegria = 100;
let Dinero = 0;

let Tiempovida = 0;
let VecesTrabajadas = 0;
let UsarAcciones = false;
let BloquearTrabajo = false;

const emoji = document.getElementById('emoji');
const mascotaNombreEditable = document.getElementById('nombre-mascota');
const tiempoVida = document.getElementById('TiempoVida');
const plata = document.getElementById('dinero');
const btnNombre = document.getElementById('btn-nombre');
const insertarNombre = document.getElementById('insertar-nombre');

const jugar = document.querySelector('.btn-jugar');
const limpiar = document.querySelector('.btn-limpiar');
const chambear = document.querySelector('.btn-chambear');

const medicina = document.getElementById('btn-medicina');
const chatarra = document.getElementById('btn-chatarra');
const saludable = document.getElementById('btn-saludable');

const statsAlegria = document.getElementById('barra-alegria');
const statsComida = document.getElementById('barra-comida');
const statsHigiene = document.getElementById('barra-higiene');
const statsSalud = document.getElementById('barra-salud');

function limitar(valor) {
    return Math.max(0, Math.min(100, valor));
}

function actuBarras() {
    statsComida.style.width = `${Comida}%`;
    statsAlegria.style.width = `${Alegria}%`;
    statsHigiene.style.width = `${Higiene}%`;
    statsSalud.style.width = `${Salud}%`;
    plata.textContent = `💰$${Dinero} Dolares`;
}

function actuEmoji() {
    if (!UsarAcciones) return;

    if (Salud <= 0 || 
        Comida <= 0 ||
        Alegria <= 0 || 
        Higiene <= 0) {
        emoji.textContent = "😵";
        alert("TU EMOJI A MUERTO");
        location.reload();

    } else if (Salud < 30) {
        emoji.textContent = "🤢";

    } else if (Salud < 40 || 
        Comida < 40 || 
        Alegria < 40 || 
        Higiene < 40) {
        emoji.textContent = "😟";

    } else if (Salud >= 70 || 
        Comida >= 70 || 
        Alegria >= 70 ||
        Higiene >= 70) {
        emoji.textContent = "😀";

    } else {
        emoji.textContent = "😐";
    }
}

btnNombre.addEventListener("click", () => {
    if (insertarNombre.value.trim() !== "") {
        Nombre = insertarNombre.value.trim();
        mascotaNombreEditable.textContent = Nombre.toUpperCase();
        emoji.textContent = "🐣";
        btnNombre.disabled = true;
        insertarNombre.disabled = true;
        insertarNombre.style.display = "none";
        btnNombre.style.display = "none";

        setTimeout(() => {
            UsarAcciones = true;
            emoji.textContent = "😃";
        }, 3000);

        setInterval(() => {
            if (UsarAcciones) {
                Comida = limitar(Comida - 1);
                Alegria = limitar(Alegria - 1);
                Higiene = limitar(Higiene - 1);
                Salud = limitar(Salud - 1);
                actuBarras();
                actuEmoji();
            }
        }, 5000);

        setInterval(() => {
            if (UsarAcciones) {
                Tiempovida++;
                tiempoVida.textContent = `${Math.floor(Tiempovida / 60)} minutos de vida`;
            }
        }, 1000);
    }   

});

jugar.addEventListener("click", () => {
    if(!UsarAcciones)return;
    Alegria = limitar(Alegria + 10);
    Higiene = limitar(Higiene - 5);
    actuBarras();
    actuEmoji();
});

limpiar.addEventListener("click", () => {
    if(!UsarAcciones)return;
    Higiene = limitar(Higiene + 50)
    Alegria = limitar(Alegria -10)
    Salud =  limitar (Salud + 30)
    actuBarras ();
    actuEmoji ();
});

chambear.addEventListener("click", ()=>{
    if(!UsarAcciones || BloquearTrabajo || VecesTrabajadas >=3) return;
    Higiene = limitar (Higiene - 20)
    Alegria = limitar(Alegria - 10)
    Dinero+= 300;
    VecesTrabajadas++
    actuBarras()
    actuEmoji();

    if (VecesTrabajadas >= 3){
        BloquearTrabajo = true;
        chambear.disabled = true;
        chambear.style.backgroundColor = "red";
        setTimeout(() =>{
            BloquearTrabajo = false;
            VecesTrabajadas = 0;
            chambear.disabled = false;
            chambear.style.backgroundColor = '';
        }, 360000);
    }
});

medicina.addEventListener("click", ( ) =>{
    if(!UsarAcciones || Dinero < 100) return;
    Dinero-=100;
    Salud = limitar(Salud + 100)
    actuBarras();
    actuEmoji();    
});

chatarra.addEventListener("click", () =>{
    if(!UsarAcciones || Dinero < 20) return;
    Dinero-=10;
    Salud = limitar(Salud - 10);
    Comida = limitar(Comida + 20);
    actuBarras ();
    actuEmoji ();
})

saludable.addEventListener("click", ()=>{
    if(!UsarAcciones || Dinero < 30) return;
    Dinero-=30;
    Comida = limitar(Comida  + 20);
    Salud = limitar(Salud + 10);
    actuBarras();
    actuEmoji();
})
