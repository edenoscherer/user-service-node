# Projeto de Cadastro de Usuários com Node.js, TypeScript e MySQL

Este projeto implementa um sistema de cadastro de usuários com operações CRUD (Create, Read, Update, Delete), protegendo rotas com JWT e persistindo dados em MySQL.

### Tecnologias Utilizadas

- **Node.js** e **Express** para criação da API.
- **TypeScript** para tipagem estática e melhor organização do código.
- **MySQL** para persistência de dados.
- **Joi** para validação de dados.
- **Swagger** para documentação de API.

### Requisitos

- **Docker** e **Docker Compose** para execução.
- Node.js e MySQL, caso opte por rodar localmente.

### Configuração do Ambiente

1. Copie o arquivo `.env.example` para `.env` e configure as variáveis:

   DB_HOST=db  
   DB_USER=root  
   DB_PASSWORD=yourpassword  
   DB_NAME=testdb  
   JWT_SECRET=your_jwt_secret

2. Execute o projeto com Docker:

   docker-compose up --build

### Migrações de Banco de Dados

Para executar as migrações, rode:

npm run migrate

### Documentação da API com Swagger

Acesse http://localhost:3000/api-docs para visualizar e testar a documentação da API gerada automaticamente pelo Swagger.

### Executando Testes

Para rodar testes unitários e de integração:

npm test

### Conversão para TypeScript

Caso queira usar TypeScript:

1. Instale as dependências:

   npm install typescript ts-node @types/node @types/express @types/bcryptjs @types/jsonwebtoken --save-dev

2. Renomeie os arquivos `.js` para `.ts` e ajuste as tipagens onde necessário.
3. Compile o projeto com `tsc` ou use `ts-node` para rodar diretamente com TypeScript.

### Endpoints Principais

- `POST /auth/login`: Realiza login e retorna token JWT.
- `POST /users`: Cria um novo usuário (Protegido).
- `GET /users`: Lista usuários (Protegido).
- `GET /users/:id`: Consulta usuário por ID (Protegido).
- `PUT /users/:id`: Atualiza dados de usuário (Protegido).
- `DELETE /users/:id`: Remove logicamente um usuário (Protegido).

---

Este projeto atende ao objetivo de implementar um sistema de cadastro seguro e escalável, aplicando boas práticas de segurança e validação de dados.
