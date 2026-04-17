const valorPalpite = document.getElementById("valor-input");
const reiniciarQuiz = document.getElementById("restart-btn");
const enviarPalpite = document.getElementById("try-btn");
const mensagem = document.getElementById("msg");
const containerResultados = document.querySelector(".resultados");

// --- CONFIGURAÇÃO DE ÁUDIO ---
const sons = {
    erro: new Audio('musica/erro.mp3'),
    acerto: new Audio('musica/acerto.mp3'),
    vitoria: new Audio('musica/vitoria.mp3')
};

// Pré-carrega os sons para estarem prontos
Object.values(sons).forEach(son => {
    son.preload = 'auto';
    son.load(); 
});

let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// --- EVENTOS ---
enviarPalpite.addEventListener("click", sendAnswer);
reiniciarQuiz.addEventListener("click", restartQuiz);

valorPalpite.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendAnswer();
});

// --- LÓGICA DE SOM ---
function play(audio) {
    // Reset fundamental para permitir repetição rápida
    audio.pause();
    audio.currentTime = 0;
    
    // Promessa para lidar com bloqueio de autoplay do navegador
    audio.play().catch(err => {
        console.warn("Áudio bloqueado pelo navegador. Interaja com a página primeiro.");
    });
}

function sendAnswer() {
    const palpite = Number(valorPalpite.value);  

    if (valorPalpite.value === "") {
        mensagem.textContent = "O campo não pode estar vazio";
        return;
    }

    if (palpite === numeroSecreto) {
        play(sons.acerto);
        play(sons.vitoria);

        mensagem.textContent = "Você acertou, PARABÉNS! Reiniciando em 5 segundos...";
        enviarPalpite.disabled = true;

        setTimeout(() => {
            restartQuiz();
            enviarPalpite.disabled = false;
            sons.vitoria.pause();
        }, 5000);

    } else {
        play(sons.erro);
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
    sons.vitoria.pause();
    sons.vitoria.currentTime = 0;
}
