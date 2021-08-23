FROM node:latest as temp
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Criar um web server com nginx
# Vamos pegar nossa imagem base nginx
FROM nginx:latest
VOLUME /var/cache/nginx
RUN rm -rf /usr/share/nginx/html/*
# Copiamos o diretório “usr/local/app/dist/sample-angular-app” da imagem #temporária “temp”  para o diretório /usr/share/nginx/html da imagem nginx
COPY --from=temp /app/dist/gerenciador-tarefas /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
# Abrimos a porta 80, padrão do NGINX
#EXPOSE 80

# docker build -t gerenciador-tarefas .
# docker run -p 8082:80