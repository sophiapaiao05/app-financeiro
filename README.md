# SOPHIA-APP-FINANCEIRO

## Índice

- [Sobre](#sobre)
- [Instalação](#instalação)
- [Execução com Docker](#execução-com-docker)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)

## Sobre

Nesse projeto, por enquanto, adicionei apenas a página de cartão (primeira fase) e o início de uma outra página de home do projeto, que será melhorada depois.

## Instalação

Instruções para configurar o ambiente de desenvolvimento.

1. Clone o repositório:

```bash
git clone https://github.com/sophiapaiao05/app-financeiro
```
cd seu-repositorio

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação:

```bash
npm run dev
```

4. Abrir no navegador: http://localhost:3000

## Execução com Docker

Instruções para construir e executar a aplicação usando Docker.

1. Clone o repositório:

```bash
git clone https://github.com/sophiapaiao05/app-financeiro
```

2. Construa a imagem Docker:

```bash
docker build -t meu-frontend .
```

3. Execute o contêiner Docker:

```bash
docker run -p 3000:3000 meu-frontend
```
4. Abrir no navegador: http://localhost:3000

## Funcionalidades

- Página de cartões
- Modais de confirmação de exclusão e edição de conta
- Listagem de transações
- Filtro de transações
- Pesquisa de transações
- Adição de arquivos
- Visualização do arquivo
- Edição e exclusão de transações
- Uso de Docker Compose para orquestração de
múltiplos contêineres
- Aplicação de tipagem estática para melhorar a robustez
e manutenção do código
- Client-Side Fetching
-  Google Cloud Deploy (em dev)

## Tecnologias
- Next.js
- React
- CSS
- TypeScript
- ESLint
