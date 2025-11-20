TESTE PRÁTICO GnTech - Extração de Dados via API

Este projeto busca dados climáticos de uma cidade utilizando a API pública OpenWeather, armazena os dados em um banco PostgreSQL e disponibiliza uma API RESTful para consulta. O projeto é conteinerizado com Docker, garantindo que funcione em qualquer máquina.

TECNOLOGIAS UTILIZADAS

Node.js + Express

PostgreSQL

Docker / Docker Compose

Axios

Dotenv

ESTRUTURA DO PROJETO

TESTE-PRATICO-GUPY/
│
├─ src/
│ ├─ server.js - Servidor Express
│ └─ weather.js - Funções de busca e inserção de clima
│
├─ db.js - Conexão com PostgreSQL
├─ package.json
├─ package-lock.json
├─ .env.example - Variáveis de ambiente (modelo)
└─ docker-compose.yml - Configuração dos containers

CONFIGURAÇÃO DO AMBIENTE

Clonar o repositório:

git clone https://github.com/Wheel23/Teste-Pratico-Gupy.git

cd src 

Criar arquivo .env a partir de .env.example e preencher com suas próprias informações:

DB_USER=<usuario_postgres>
DB_PASS=<senha_postgres>
DB_NAME=<nome_banco>
DB_HOST=db
DB_PORT=5432
CITY=<cidade>
OPENWEATHER_KEY=<sua_chave_api>


Container do PostgreSQL (postgres-clima)

Container do Node.js (api-clima)

USO DA API

Atualizar clima (busca na OpenWeather e salva no banco):

http://localhost:3000/atualizar

Retorno esperado:

{
"mensagem": "Clima atualizado com sucesso!"
}

Consultar clima (últimos registros):

http://localhost:3000/clima
