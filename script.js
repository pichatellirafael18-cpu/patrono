/**
 * A Saga do Mensageiro - Convite Patrono
 * Lógica do jogo interativo e animações automáticas
 */

document.addEventListener('DOMContentLoaded', () => {



    /* Elementos das Telas */
    const scrImpact = document.getElementById('screen-impact');
    const scrLogin = document.getElementById('screen-login');
    const scrLoading = document.getElementById('screen-loading');
    const scrGame = document.getElementById('screen-game');
    const scrFinal = document.getElementById('screen-final');

    /* ========== FASE 1: IMPACTO & LOGIN ========== */
    
    // Espera o clique no botão para entrar em tela cheia e prosseguir
    const btnFullscreenStart = document.getElementById('btn-fullscreen-start');
    if (btnFullscreenStart) {
        btnFullscreenStart.addEventListener('click', () => {
            // Tenta entrar em tela cheia
            const docEl = document.documentElement;
            const requestFS = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            if (requestFS) {
                requestFS.call(docEl).catch(err => console.log("O navegador bloqueou a tela cheia."));
            }

            // Oculta a tela de impacto e mostra o login
            scrImpact.classList.add('hidden');
            scrLogin.classList.remove('hidden');
        });
    }

    const passInput = document.getElementById('password');
    const eyeBtn = document.getElementById('eye-btn');
    const submitBtn = document.getElementById('submit-login');

    if (eyeBtn) {
        eyeBtn.addEventListener('click', () => {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                eyeBtn.innerHTML = "👁️";
            } else {
                passInput.type = 'password';
                eyeBtn.innerHTML = `<svg class="eye-icon closed" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>`;
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (passInput.value === "mediods.2026") {
                submitBtn.classList.add('active-click');
                // Ativar Loading
                setTimeout(() => {
                    submitBtn.classList.remove('active-click');
                    scrLogin.classList.add('hidden');
                    scrLoading.classList.remove('hidden');
                    
                    // Simula tempo de loading de 3.5 segundos
                    setTimeout(() => {
                        startGameplay();
                    }, 3500);
                }, 500);
            } else {
                alert("Senha incorreta! Tente novamente.");
            }
        });
    }


    /* ========== FASE 2: INTEGRAÇÃO & GAMEPLAY RPG (NODE-BASED) ========== */
    
    /* ========== FASE 2: INTEGRAÇÃO & GAMEPLAY RPG (NODE-BASED) ========== */
    
    // Estrutura de Narrativa em Ramificações
    const rpgNodes = {
        start: {
            title: "O Despertar",
            narrative: "Vocês despertam. A mente está turva. Diante de vocês, um grupo de aventureiros estende a mão. O líder fala: 'A jornada nos chama. Ao final de todas as trilhas, um grandioso Salão onde muitos se reúnem para ouvir e aprender nos aguarda",
            nextNode: "hub" 
        },
        hub: {
            title: "A Taverna Imaginária",
            narrative: "Chegamos à Taverna Imaginária — o nome do projeto, da ideia, da iniciativa que estamos aqui para apresentar. O taverneiro nos avisa: existem dois caminhos até este Salão das Vozes",
            nextNode: "riddle"
        },
        riddle: {
            title: "O Enigma Poético",
            narrative: "\"Mas antes, responda-me... Aquilo que se expande por aquilo que não se vê. Vazio vira forma e a aposta, se perdida, é vivida... O que guia seus ossos até o nosso salão final, a Sabedoria Antiga ou o Arrepio da Moeda?\"",
            choices: [
                { text: "Caminho do Conhecimento (Arquivo dos Ecos)", nextNode: "path_knowledge", result: "Você confia as respostas ao templo do pensamento." },
                { text: "Caminho da Diversão (Arena dos Jogos)", nextNode: "path_fun", result: "Você abraça a paixão caótica do desconhecido!" }
            ]
        },
        path_knowledge: {
            title: "O Arquivo dos Ecos",
            narrative: "No recanto silencioso do universo, um Guardião Cego materializa um mapa rasgado de couro e o deixa sobre uma mesa de pedra. Ele permanece em silêncio. Você percebe que o mapa exibe uma estrela dourada engolindo seu próprio rastro, mas as runas ao redor são indecifráveis à primeira vista.",
            choices: [
                { text: "Focar em desvendar as runas do mapa", nextNode: "pk_mapa", result: "Você ignora a presença do guardião e mergulha nos símbolos." },
                { text: "Interrogar o Guardião pacientemente", nextNode: "pk_guardiao", result: "Você decide que a fonte do conhecimento está na mente, não no papel." }
            ]
        },
        pk_mapa: {
            title: "O Código do Ouroboros",
            narrative: "Sua mente trabalha como uma engrenagem acelerada. As runas não são letras, mas posições estelares. Ao tocar cada símbolo na ordem correta, o mapa entra em chamas e se transmuta em um feixe de luz que rasga o espaço à sua frente. Você descobriu a passagem secreta dos antigos arquitetos.",
            nextNode: "final"
        },
        pk_guardiao: {
            title: "A Verdade Sussurrada",
            narrative: "O Guardião sorri levemente e o mapa de couro vira poeira. 'O Conhecimento não está registrado, viajante. Ele é vivido.' Ele repousa a mão na sua testa, e memórias cósmicas inundam o seu ser. Com uma mente agora vasta como as próprias estrelas, você avança transpondo as paredes do tempo.",
            nextNode: "final"
        },
        path_fun: {
            title: "A Arena dos Jogos",
            narrative: "Cores gritantes e música frenética preenchem o ar viciado. Os aventureiros apostam moedas cintilantes em uma mesa onde chamas dançam conforme os dados rolam. 'Um desafio direto aos seus maiores medos antes da assembleia!', clamam eles, empurrando um copo vazio na sua direção.",
            choices: [
                { text: "Pegar os dados e apostar tudo!", nextNode: "pf_jogar", result: "Os aplausos estouram! Você abraça a incerteza do caos." },
                { text: "Sair da mesa e explorar os fundos", nextNode: "pf_explorar", result: "A euforia vã da multidão não te cativa." }
            ]
        },
        pf_jogar: {
            title: "A Sorte Flamejante",
            narrative: "Os dados rolam e faíscas voam pela sala! Você ganha a aposta absoluta e a mesa vai ao delírio. Como prêmio máximo, o mestre do jogo lhe entrega um artefato mágico de vitalidade. A energia transborda no seu peito enquanto você atravessa as portas VIP, que desembocam no evento final.",
            nextNode: "final"
        },
        pf_explorar: {
            title: "O Salão dos Espelhos",
            narrative: "Deixando a gritaria para trás, você adentra os corredores obscuros da taverna. Lá, esbarra num ambiente misterioso que distorce o espaço. Uma figura mascarada surge e sussurra: 'A maior diversão é encontrar a si mesmo'. O chão mágico se dissolve e te transporta num piscar de olhos.",
            nextNode: "final"
        }
    };

    let currentNode = 'start';

    function startGameplay() {
        scrLoading.classList.add('hidden');
        scrGame.classList.remove('hidden');
        
        renderPhase('start');
    }

    // Helper para o efeito de transição "máquina de escrever"
    function typeText(element, text, speed, callback) {
        element.textContent = "";
        element.style.opacity = '1';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    function renderPhase(nodeId) {
        if(nodeId === 'final') {
            finishGame();
            return;
        }

        const node = rpgNodes[nodeId];
        currentNode = nodeId;
        
        const titleEl = document.getElementById('phase-title');
        const narrativeEl = document.getElementById('phase-narrative');
        const container = document.getElementById('game-choices');
        const resEl = document.getElementById('phase-result');
        
        // Reset element states
        titleEl.textContent = "";
        narrativeEl.innerHTML = "";
        container.innerHTML = "";
        resEl.classList.add('hidden');
        resEl.style.opacity = '0';
        
        // Escrita da Narrativa (o título aparece instantaneamente)
        titleEl.textContent = node.title;
        typeText(narrativeEl, node.narrative, 25, () => {
            renderChoices(node);
        });
    }

    function renderChoices(node) {
        const container = document.getElementById('game-choices');
        
        if (!node.choices || node.choices.length === 0) {
            const btnNext = document.createElement('button');
            btnNext.className = 'rpg-btn';
            btnNext.textContent = "Prosseguir";
            btnNext.addEventListener('click', () => {
                renderPhase(node.nextNode);
            });
            container.appendChild(btnNext);
        } else {
            node.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'rpg-btn';
                btn.textContent = choice.text;
                
                btn.addEventListener('click', () => {
                    handleChoice(choice.result, choice.nextNode);
                });
                container.appendChild(btn);
            });
        }
    }

    function handleChoice(resultText, nextNode) {
        const container = document.getElementById('game-choices');
        
        // Transição de início: desvanece suavemente as opções antes de limpá-las
        container.style.transition = 'opacity 0.6s ease-in-out';
        container.style.opacity = '0';

        setTimeout(() => {
            // Remove as escolhas após o fade-out
            container.innerHTML = "";
            
            // Anima a caixa de jogo (feedback sutil)
            const gameContainer = document.querySelector('.game-container');
            gameContainer.style.boxShadow = '0 0 50px rgba(255, 183, 77, 0.4)';
            setTimeout(() => gameContainer.style.boxShadow = '0 0 40px rgba(0,0,0,0.8)', 1000);

            const resEl = document.getElementById('phase-result');
            
            function showNextButton() {
                const btnNext = document.createElement('button');
                btnNext.className = 'rpg-btn';
                btnNext.textContent = "Prosseguir";
                btnNext.style.marginTop = "20px";
                btnNext.addEventListener('click', () => {
                    resEl.classList.add('hidden');
                    resEl.style.opacity = '0';
                    renderPhase(nextNode);
                });
                container.appendChild(btnNext);
                
                // Fade-In do container contendo o botão
                setTimeout(() => {
                    container.style.opacity = '1';
                }, 50);
            }

            if (resultText) {
                resEl.textContent = "";
                resEl.classList.remove('hidden');
                resEl.style.opacity = '1';
                
                let resIdx = 0;
                function typeResult() {
                    if (resIdx < resultText.length) {
                        resEl.textContent += resultText.charAt(resIdx);
                        resIdx++;
                        setTimeout(typeResult, 30);
                    } else {
                        showNextButton();
                    }
                }
                typeResult();
            } else {
                showNextButton();
            }

        }, 600); // tempo de fade-out das opções antigas
    }


    /* ========== FASE 3: CONCLUSÃO ========== */
    function finishGame() {
        scrGame.classList.add('hidden');
        scrFinal.classList.remove('hidden');
    }

});
