async function renderGitHubSkills() {
        const username = 'paulorabelo';
        // Seleciona TODOS os containers de barras (tanto o de pt-br quanto o de us-en)
        const containers = document.querySelectorAll('.progress-bars');

        if (containers.length === 0) return;

        try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const repos = await response.json();

                const langData = {};
                let totalPoints = 0;

                repos.forEach(repo => {
                        if (repo.language) {
                                langData[repo.language] = (langData[repo.language] || 0) + 1;
                                totalPoints++;
                        }
                });

                const sortedLangs = Object.entries(langData).sort((a, b) => b[1] - a[1]);

                // Percorremos cada container encontrado para injetar o HTML
                containers.forEach(container => {
                        container.innerHTML = ''; // Limpa o "Carregando..." de cada um

                        sortedLangs.forEach(([lang, count]) => {
                                const percentage = ((count / totalPoints) * 100).toFixed(2);
                                const skillElement = `
                    <div class="progress-bar">
                        <p class="prog-title">${lang}</p>
                        <div class="progress-con">
                            <p class="prog-text">${percentage}%</p>
                            <div class="progress">
                                <span style="width: ${percentage}%"></span>
                            </div>
                        </div>
                    </div>
                `;
                                container.innerHTML += skillElement;
                        });

                        // Adiciona o selo da fonte abaixo de cada container
                        const sourceDivId = `source-${container.parentElement.className.includes('pt-br') ? 'pt' : 'en'}`;
                        if (!document.getElementById(sourceDivId)) {
                                const sourceDiv = document.createElement('div');
                                sourceDiv.id = sourceDivId;
                                sourceDiv.className = 'skills-source';

                                // Define o texto baseado na linguagem do container pai
                                const label = container.closest('.pt-br') ? 'Dados sincronizados via' : 'Data synced via';

                                sourceDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 30px; border-top: 1px solid var(--color-grey-5); padding-top: 20px;">
                        <svg height="20" viewBox="0 0 16 16" width="20" fill="var(--color-secondary)" style="flex-shrink: 0;">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span style="font-size: 0.85rem; color: var(--color-grey-2); text-transform: uppercase; letter-spacing: 1px;">
                            ${label} <a href="https://github.com/paulorabelo" target="_blank" style="color: var(--color-secondary); text-decoration: none; font-weight: bold;">GitHub API</a>
                        </span>
                    </div>
                `;
                                container.parentNode.appendChild(sourceDiv);
                        }
                });

        } catch (error) {
                console.error("Erro ao carregar skills:", error);
        }
}

// Inicialização
document.addEventListener('DOMContentLoaded', renderGitHubSkills);