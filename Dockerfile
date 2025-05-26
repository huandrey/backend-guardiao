# Usar uma imagem Node oficial como base
FROM node:20-alpine

# Instalar dependências do sistema para SQLite
RUN apk add --no-cache sqlite

# Definir o diretório de trabalho no container
WORKDIR /app

# Criar diretório de dados com permissões corretas
RUN mkdir -p /app/data && chown node:node /app/data

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
    
# Usar usuário não-root
USER node

# Expor a porta em que a aplicação vai rodar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]

