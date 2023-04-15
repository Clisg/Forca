const comidas =[
"banana", "marzipã", "polenta", "chocolate", "donuts", "batatafrita", "lasanha", "sorvete",
"hamburguer", "hushpuppies", "chimichangas", "coxinha"
];
const lugares =[
"tailandia", "mexico", "irlanda", "estadosunidos", "alemanha", "japão", "novayorque",
"machupicchu", "chapadadiamantina", "yucatan"

];
const tenteASorte =[
"pluridimensionalidade", "interdisciplinaridade ", "extraterritorialidade", "hebdomadario", 
"kafkaesco", "modorrento", "numismatica"
];

const imgFinal = document.querySelector(".imgfinal");
const seletor = document.querySelector("select");

imgFinal.style.display = "none";

var palavraSecreta= null;
const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown", (evento)=>{
    const codigo = evento.keyCode;
    if(isLetra(codigo)){
        const letra = evento.key;
        if (letrasErradas.includes(letra)){
            mostrarAvisoLetraRepetida();
        }else {
            if (palavraSecreta.includes(letra)){
                letrasCorretas.push(letra);
            }else {
                letrasErradas.push(letra);
            }
        }
            atualizarJogo();
    }
})
function isLetra(codigo){
    return codigo >= 65 && codigo <= 90;
}

function atualizarJogo(){
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
}

function mostrarLetrasErradas(){
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras erradas</h3>";
    letrasErradas.forEach(letra =>{
        div.innerHTML += `<span>${letra}</span>`;
    })
}

function mostrarLetrasCertas(){
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML ="";
    palavraSecreta.split("").forEach(letra =>{
        if(letrasCorretas.includes(letra)){
            container.innerHTML += `<span>${letra}</span>`;
        }else{
            container.innerHTML += `<span>_</span>`;
        }
    })
}

function checarJogo(){
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-parte");
    if(letrasErradas.length === partesCorpo.length){
        mensagem = " -- Fim de Jogo -- Tente outra vez!";
    }
    if (palavraSecreta === container.innerText){
        mensagem = "-- PARABÉNS!!! -- Você Ganhou!";
    }
    if (mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
        imgFinal.style.display = "";
        seletor.disabled = false;

    }
}

function desenharForca(){
    const partesCorpo = document.querySelectorAll (".forca-parte");
    for (let i=0; i < letrasErradas.length; i++){
        partesCorpo[i].style.display = "block";
    }
}

function mostrarAvisoLetraRepetida(){
    const aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
        setTimeout(()=>{
        aviso.classList.remove("show");
        }, 1000);
}

function reiniciarJogo() {
    window.location.reload();
  }

function sorteiaArray (array){
        
        palavraSecreta= array[Math.floor(Math.random()*array.length)];
        console.log(palavraSecreta, Math.floor(Math.random()*array.length));
        const div = document.querySelector(".letras-erradas-container");
        div.focus();
}
function decideTema(event){
    var valor = event.target.value;
    if (valor == "Comidas"){
        sorteiaArray(comidas);
    }
    if (valor == "Lugares"){
        sorteiaArray(lugares);
    }
    if (valor == "Tente a Sorte"){
        sorteiaArray(tenteASorte);
    }
    seletor.disabled = true;
    console.log(event.target.value);

}