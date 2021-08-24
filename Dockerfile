FROM node:14 as builder
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm install -g @angular/cli@12.0.1 --unsafe
RUN ng build

# Copiar arquivos do projeto para o NGINX
FROM nginx:1.21.1-alpine
COPY --from=builder /usr/src/app/dist/gerenciador-tarefas /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -f .Dockerfile -t gerenciador-tarefas .

# docker run --name gerenciador-tarefas -d -p 9022:80 yanalexandrebz/gerenciador-tarefas

############### SUBIR NO HUB.DOCKER.COM ###############
# $ docker build -t yanalexandrebz/atividadedocker .
# $ docker run -d --name=atividadedocker -p 80:80 yanalexandrebz/atividadedocker
# $ docker push  yanalexandrebz/atividadedocker

