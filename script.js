const valorPalpite = document.getElementById("valor-input");
const reiniciarQuiz = document.getElementById("restart-btn");
const enviarPalpite = document.getElementById("try-btn");
const mensagem = document.getElementById("msg");
const containerResultados = document.querySelector(".resultados");

// --- DEFINIÇÃO DOS SONS ---
// Substitua as definições antigas por estas:
const somErro = new Audio('musica/erro.mpeg');
somErro.preload = 'auto';

const somAcerto = new Audio('musica/acerto.mpeg');
somAcerto.preload = 'auto';

const somVitoria = new Audio('musica/vitoria.mpeg');
somVitoria.preload = 'auto';



let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Event Listeners
enviarPalpite.addEventListener("click", sendAnswer);
reiniciarQuiz.addEventListener("click", restartQuiz);

// Detecta Enter
valorPalpite.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendAnswer();
});

function sendAnswer() {
    const palpite = Number(valorPalpite.value);  

    if (valorPalpite.value === "") {
        mensagem.textContent = "O campo não pode estar vazio";
        return;
    }

    if (palpite === numeroSecreto) {
        somAcerto.play();
        somVitoria.play();

        mensagem.textContent = "Você acertou, PARABÉNS! Reiniciando em 5 segundos...";
        enviarPalpite.disabled = true;

        setTimeout(() => {
            restartQuiz();
            enviarPalpite.disabled = false;
            somVitoria.pause();
            somVitoria.currentTime = 0;
        }, 5000);

    } else {
        somErro.play();
        mensagem.textContent = "Você errou! Veja a dica abaixo:";
        
        let iconeSeta = (palpite > numeroSecreto) ? "arrow_downward" : "arrow_upward";

        containerResultados.innerHTML += `
            <div class="r-esult">
                <i class="number">${palpite}</i>
                <span class="material-symbols-outlined">${iconeSeta}</span>
            </div>
        `;

        containerResultados.scrollTop = containerResultados.scrollHeight;
        valorPalpite.value = "";
        valorPalpite.focus();
    }
}

function restartQuiz() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    valorPalpite.value = "";
    mensagem.textContent = "Jogo reiniciado! Tente adivinhar.";
    containerResultados.innerHTML = "Historicos:";
    
    somVitoria.pause();
    somVitoria.currentTime = 0;

    console.log("Novo número secreto:", numeroSecreto);
}
