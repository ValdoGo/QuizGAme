const valorPalpite = document.getElementById("valor-input");
const reiniciarQuiz = document.getElementById("restart-btn");
const enviarPalpite = document.getElementById("try-btn");
const mensagem = document.getElementById("msg");
const containerResultados = document.querySelector(".resultados");

// --- DEFINIÇÃO DOS SONS ---
const somErro = new Audio('sons/erro.mp3');
const somAcerto = new Audio('sons/acerto.mp3');
const somVitoria = new Audio('sons/vitoria.mp3');

let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Event Listeners
enviarPalpite.addEventListener("click", sendAnswer);
reiniciarQuiz.addEventListener("click", restartQuiz);

// Tecla Enter
valorPalpite.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendAnswer();
});

function sendAnswer() {
    const palpite = Number(valorPalpite.value);  

    if (valorPalpite.value === "") {
        mensagem.textContent = "O campo não pode estar vazio";
        return;
    }

    if (palpite === numeroSecreto) {
        // --- SOM DE ACERTO E VITÓRIA ---
        somAcerto.play();
        somVitoria.play();

        mensagem.textContent = "Você acertou, PARABÉNS! Reiniciando em 5 segundos...";
        enviarPalpite.disabled = true;

        setTimeout(() => {
            restartQuiz();
            enviarPalpite.disabled = false;
            
            // Para a música de vitória ao reiniciar
            somVitoria.pause();
            somVitoria.currentTime = 0;
        }, 5000);

    } else {
        // --- SOM DE ERRO ---
        somErro.play();

        mensagem.textContent = "Você errou! Veja a dica abaixo:";
        
        let iconeSeta = (palpite > numeroSecreto) ? "arrow_downward" : "arrow_upward";

        containerResultados.innerHTML += `
            <div class="r-esult">
                <i class="number">${palpite}</i>
                <span class="material-symbols-outlined">${iconeSeta}</span>
            </div>
        `;

        // Scroll automático e foco
        containerResultados.scrollTop = containerResultados.scrollHeight;
        valorPalpite.value = "";
        valorPalpite.focus();
    }
}

function restartQuiz() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    valorPalpite.value = "";
    mensagem.textContent = "Jogo reiniciado! Tente adivinhar.";
    
    // Limpa o histórico
    containerResultados.innerHTML = "Historicos:";
    
    // Para a música caso o usuário reinicie manualmente
    somVitoria.pause();
    somVitoria.currentTime = 0;

    console.log("Novo número secreto:", numeroSecreto);
}
