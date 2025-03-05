# Usar uma imagem Node oficial como base
FROM node:20-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de configuração do projeto
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos do projeto
COPY . .

# Compilar o TypeScript
RUN npm run build

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
