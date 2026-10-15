# 📈 Sistema de Cotações

Aplicação full stack para **acompanhar indicadores e suas cotações**. Você cadastra indicadores (dólar, CDI, preço de um insumo…), registra valores ao longo do tempo e vê a evolução num gráfico de barras.

![Java](https://img.shields.io/badge/java_17-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![H2](https://img.shields.io/badge/H2_Database-1E5A96?style=flat)

## ✨ Funcionalidades

- Cadastro, **pesquisa** e exclusão de **indicadores** (com confirmação antes de excluir)
- Registro de **cotações** (valor + data/hora) vinculadas a um indicador
- **Gráfico de barras** com a evolução das cotações
- API REST completa, incluindo edição de indicadores

## 🏗️ Estrutura

```
sistema-cotacoes/
├── backend/    # API REST em Spring Boot (JPA + H2 em memória)
│   └── src/main/java/backend/
│       ├── controller/  # IndicadorController e CotacaoController
│       ├── model/       # Indicador e Cotacao
│       └── repository/  # Spring Data JPA
└── frontend/   # Interface em React (Create React App)
```

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/indicadores` | Lista os indicadores |
| POST | `/indicadores` | Cria um indicador |
| PUT | `/indicadores/{id}` | Atualiza um indicador |
| DELETE | `/indicadores/{id}` | Remove um indicador |
| GET | `/cotacoes` | Lista as cotações |
| POST | `/cotacoes` | Registra uma cotação |
| DELETE | `/cotacoes/{id}` | Remove uma cotação |

## ▶️ Como rodar

Requisitos: **Java 17+** e **Node.js**.

**Backend** (porta 8080):

```bash
cd backend
./mvnw spring-boot:run
```

O banco H2 fica em memória e é recriado a cada execução. O console fica em `http://localhost:8080/h2-console`.

**Frontend** (porta 3000):

```bash
cd frontend
npm install
npm start
```

Depois é só abrir `http://localhost:3000`. O frontend espera a API em `http://localhost:8080`, então suba o backend primeiro.
