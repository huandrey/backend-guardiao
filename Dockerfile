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

ARG ODONTO_GUARDIAO_EMAIL
ARG ODONTO_GUARDIAO_PWD
ARG CONSELHO_REGIAO_NORTE_EMAIL
ARG CONSELHO_REGIAO_SUL_EMAIL
ARG CONSELHO_REGIAO_LESTE_EMAIL
ARG CONSELHO_REGIAO_OESTE_EMAIL
ENV ODONTO_GUARDIAO_EMAIL=$ODONTO_GUARDIAO_EMAIL \
    ODONTO_GUARDIAO_PWD=$ODONTO_GUARDIAO_PWD \
    CONSELHO_REGIAO_NORTE_EMAIL=$CONSELHO_REGIAO_NORTE_EMAIL \
    CONSELHO_REGIAO_SUL_EMAIL=$CONSELHO_REGIAO_SUL_EMAIL \
    CONSELHO_REGIAO_LESTE_EMAIL=$CONSELHO_REGIAO_LESTE_EMAIL \
    CONSELHO_REGIAO_OESTE_EMAIL=$CONSELHO_REGIAO_OESTE_EMAIL
    
# Expor a porta em que a aplicação vai rodar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]

