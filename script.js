const valorPalpite = document.getElementById("valor-input");
const reiniciarQuiz = document.getElementById("restart-btn");
const enviarPalpite = document.getElementById("try-btn");
const mensagem = document.getElementById("msg");
const containerResultados = document.querySelector(".resultados");

let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// --- EVENT LISTENERS ---

// Clique no botão Enviar
enviarPalpite.addEventListener("click", sendAnswer);

// Clique no botão Reiniciar
reiniciarQuiz.addEventListener("click", restartQuiz);

// Clique na tecla Enter (PC e Celular)
valorPalpite.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendAnswer();
    }
});

// --- FUNÇÕES ---

function sendAnswer() {
    const palpite = Number(valorPalpite.value);  

    if (valorPalpite.value === "") {
        mensagem.textContent = "O campo não pode estar vazio";
        return;
    }

    if (palpite === numeroSecreto) {
        mensagem.textContent = "Você acertou, PARABÉNS! Reiniciando em 5 segundos...";
        enviarPalpite.disabled = true;

        setTimeout(() => {
            restartQuiz();
            enviarPalpite.disabled = false;
        }, 5000);

    } else {
        mensagem.textContent = "Você errou! Veja a dica abaixo:";
        
        let iconeSeta = (palpite > numeroSecreto) ? "arrow_downward" : "arrow_upward";

        containerResultados.innerHTML += `
            <div class="r-esult">
                <i class="number">${palpite}</i>
                <span class="material-symbols-outlined">${iconeSeta}</span>
            </div>
        `;

        // Mantém o scroll no final do histórico
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
    console.log("Novo número secreto:", numeroSecreto);
}
