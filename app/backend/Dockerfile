# Dockerfile para o backend
FROM node:18

WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho no contêiner
COPY package.json ./

# Instalar as dependências do npm
RUN npm install

# Copiar todos os arquivos do diretório backend para o diretório de trabalho no contêiner
COPY . ./

# Construir a aplicação (se necessário)
RUN npm run build

# Expor a porta 3000 para acesso externo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]