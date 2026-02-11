FROM node:20-alpine

WORKDIR /app

# Instala dependencias primero (cache)
COPY package*.json ./
RUN npm ci

# Copia el resto
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
