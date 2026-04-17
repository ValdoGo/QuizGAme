const valorPalpite = document.getElementById("valor-input");
const reiniciarQuiz = document.getElementById("restart-btn");
const enviarPalpite = document.getElementById("try-btn");
const mensagem = document.getElementById("msg");
const containerResultados = document.querySelector(".resultados");

// --- DEFINIÇÃO DOS SONS (Mudei para .mp3 que é universal) ---
const somErro = new Audio('musica/erro.mp3');
const somAcerto = new Audio('musica/acerto.mp3');
const somVitoria = new Audio('musica/vitoria.mp3');

// Garante o carregamento
somErro.preload = 'auto';
somAcerto.preload = 'auto';
somVitoria.preload = 'auto';

let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// --- EVENT LISTENERS ---
enviarPalpite.addEventListener("click", sendAnswer);
reiniciarQuiz.addEventListener("click", restartQuiz);

valorPalpite.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendAnswer();
});

// --- FUNÇÃO PARA TOCAR SOM ---
function tocarSom(audio) {
    // Reset fundamental para navegadores mobile
    audio.pause();
    audio.currentTime = 0;
    
    // O play() retorna uma promessa, tratamos o erro de bloqueio do navegador
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("O navegador bloqueou o som. Clique na tela primeiro!");
        });
    }
}

function sendAnswer() {
    const palpite = Number(valorPalpite.value);  

    if (valorPalpite.value === "") {
        mensagem.textContent = "O campo não pode estar vazio";
        return;
    }

    if (palpite === numeroSecreto) {
        tocarSom(somAcerto);
        tocarSom(somVitoria);

        mensagem.textContent = "Você acertou, PARABÉNS! Reiniciando em 5 segundos...";
        enviarPalpite.disabled = true;

        setTimeout(() => {
            restartQuiz();
            enviarPalpite.disabled = false;
            somVitoria.pause();
        }, 5000);

    } else {
        tocarSom(somErro);
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
}
