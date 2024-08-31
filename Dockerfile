# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração e de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código fonte
COPY src ./src

# Compila o TypeScript para JavaScript
RUN npm run build

# Verifica se o arquivo dist/index.js foi criado
RUN ls -la dist

# Etapa 2: Imagem final de produção
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Verifica se o arquivo dist/index.js está presente na imagem final
RUN ls -la dist

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
