FROM node:20-alpine

WORKDIR /app

# Copiamos solo los archivos necesarios para instalar deps
COPY package*.json ./

RUN npm install

# Instalar Angular CLI global
RUN npm install -g @angular/cli --unsafe-perm


# Ahora sí copiamos el resto
COPY . .

EXPOSE 4200

CMD ["npm", "start"]
