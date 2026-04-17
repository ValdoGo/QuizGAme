const valorPalpite = document.getElementById("valor-input");
const reiniciarQuiz = document.getElementById("restart-btn");
const enviarPalpite = document.getElementById("try-btn");
const mensagem = document.getElementById("msg");
const containerResultados = document.querySelector(".resultados");

// --- DEFINIÇÃO DOS SONS (Usando a pasta musica/) ---
const somErro = new Audio('musica/erro.mp3');
const somAcerto = new Audio('musica/acerto.mp3');
const somVitoria = new Audio('musica/vitoria.mp3');

// Pre-carregamento para evitar atrasos
somErro.preload = 'auto';
somAcerto.preload = 'auto';
somVitoria.preload = 'auto';

let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// --- EVENT LISTENERS ---

enviarPalpite.addEventListener("click", sendAnswer);
reiniciarQuiz.addEventListener("click", restartQuiz);

// Detecta Enter no teclado
valorPalpite.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendAnswer();
});

// --- FUNÇÕES ---

// Função auxiliar para tocar o som de forma limpa
function tocarSom(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Aguardando interação do usuário para tocar som."));
}

function sendAnswer() {
    const palpite = Number(valorPalpite.value);  

    if (valorPalpite.value === "") {
        mensagem.textContent = "O campo não pode estar vazio";
        return;
    }

    if (palpite === numeroSecreto) {
        // VITÓRIA
        tocarSom(somAcerto);
        tocarSom(somVitoria);

        mensagem.textContent = "Você acertou, PARABÉNS! Reiniciando em 5 segundos...";
        enviarPalpite.disabled = true;

        setTimeout(() => {
            restartQuiz();
            enviarPalpite.disabled = false;
            somVitoria.pause();
            somVitoria.currentTime = 0;
        }, 5000);

    } else {
        // ERRO
        tocarSom(somErro);
        mensagem.textContent = "Você errou! Veja a dica abaixo:";
        
        let iconeSeta = (palpite > numeroSecreto) ? "arrow_downward" : "arrow_upward";

        containerResultados.innerHTML += `
            <div class="r-esult">
                <i class="number">${palpite}</i>
                <span class="material-symbols-outlined">${iconeSeta}</span>
            </div>
        `;

        // Scroll automático para o último palpite
        containerResultados.scrollTop = containerResultados.scrollHeight;

        valorPalpite.value = "";
        valorPalpite.focus();
    }
}

function restartQuiz() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    valorPalpite.value = "";
    mensagem.textContent = "Jogo reiniciado! Tente adivinhar.";
    
    // Limpa o histórico mantendo o título
    containerResultados.innerHTML = "Historicos:";
    
    // Para a música de vitória
    somVitoria.pause();
    somVitoria.currentTime = 0;

    console.log("Novo número secreto:", numeroSecreto);
}
