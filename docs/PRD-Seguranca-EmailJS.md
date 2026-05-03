# PRD: Integração Segura do EmailJS via Vercel Serverless Functions

## 1. Visão Geral e Objetivo
O objetivo deste documento é detalhar a migração da lógica de envio de e-mails (atualmente feita diretamente no frontend) para um ambiente seguro de backend utilizando as **Serverless Functions** da Vercel. 

Esta mudança visa resolver duas questões críticas:
1. **Segurança:** Ocultar a `Public Key` do EmailJS, impedindo que terceiros a copiem inspecionando o código-fonte do site.
2. **Controle de Cota:** Contornar a limitação do plano gratuito do EmailJS que não permite configurar uma *whitelist* (lista de permissões) de domínios. Ao isolar a chamada no backend da Vercel, garantimos que apenas o nosso formulário consiga disparar a função.

## 2. Arquitetura da Solução
- **Frontend (Cliente):** Arquivos HTML e JavaScript puros. O arquivo de formulário (`form.js`) fará uma requisição HTTP `POST` nativa (usando `fetch`) para a rota interna da Vercel.
- **Backend (Vercel API):** Uma função serverless escrita em Node.js localizada no diretório `/api`. Ela atuará como um proxy invisível.
- **Serviço Externo:** API REST oficial do EmailJS (`https://api.emailjs.com/api/v1.0/email/send`).

## 3. Requisitos Funcionais
- [ ] O sistema deve possuir um *endpoint* (rota) acessível em `/api/enviar-email`.
- [ ] O *endpoint* deve aceitar exclusivamente requisições do tipo `POST`. Qualquer outro método deve ser rejeitado com status `405 Method Not Allowed`.
- [ ] O *endpoint* deve extrair os campos `nome`, `email` e `mensagem` do corpo (body) da requisição enviada pelo frontend.
- [ ] O *endpoint* deve montar o objeto de dados (*payload*) e repassá-lo para a API do EmailJS, injetando as chaves de acesso dinamicamente via variáveis de ambiente.
- [ ] O sistema deve retornar um status HTTP `200 OK` acompanhado de um JSON de sucesso caso o EmailJS processe o envio corretamente.
- [ ] Em caso de falha (erro na API do EmailJS ou dados incompletos), o sistema deve retornar status HTTP `400` ou `500` com uma mensagem de erro clara.

## 4. Requisitos Não Funcionais e Segurança
- **Ocultação de Credenciais:** As chaves `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` e `EMAILJS_PUBLIC_KEY` **nunca** devem constar no código-fonte. Elas devem ser armazenadas exclusivamente no gerenciador de Variáveis de Ambiente da Vercel.
- **Remoção de Dependências:** O arquivo `emailjs-browser-3.min.js` (e qualquer menção a ele no `index.html`) deve ser deletado do projeto, reduzindo o peso da página e a superfície de ataque (*Supply Chain*).
- **Tratamento de Estado:** O frontend deve desabilitar o botão de envio durante a requisição para evitar cliques duplos (envios duplicados).
- **Proteção do Repositório (Local)**: O arquivo .env (caso criado para testes locais) deve obrigatoriamente ser listado dentro do arquivo .gitignore antes de qualquer commit, garantindo que as variáveis de ambiente nunca sejam enviadas para o GitHub.

## 5. Plano de Implantação (Passo a Passo)

### Fase 1: Configuração do Backend (Vercel)
1. Criar uma pasta chamada `api` na raiz do projeto.
2. Criar o arquivo `enviar-email.js` dentro da pasta `api` com a lógica de proxy em Node.js.
3. Acessar o painel do projeto na Vercel (Dashboard).
4. Navegar até **Settings** > **Environment Variables**.
5. Cadastrar as três variáveis de ambiente do EmailJS e salvar.

### Fase 2: Refatoração do Frontend
1. Excluir o arquivo `js/vendor/emailjs-browser-3.min.js`.
2. Remover a tag `<script src="js/vendor/emailjs-browser-3.min.js"></script>` do arquivo `index.html`.
3. Atualizar o arquivo `js/form.js` para usar a API nativa `fetch` do navegador, apontando para a nova rota `/api/enviar-email` e enviando os dados capturados nos campos do formulário.

### Fase 3: Testes e Deploy
1. Realizar o *commit* das alterações no repositório (GitHub).
2. Aguardar o *build* automático da Vercel.
3. Testar o formulário diretamente no domínio de produção.

## 6. Critérios de Aceite
- Ao acessar a aba *Network* e *Sources* nas ferramentas de desenvolvedor (F12) do navegador, as credenciais do EmailJS não devem ser encontradas.
- O preenchimento e envio do formulário no site deve resultar no recebimento real do e-mail na caixa de entrada configurada.
- O formulário deve apresentar *feedback* visual (alertas ou textos) informando o usuário sobre o sucesso ou erro da operação.
