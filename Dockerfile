# Imagen base
FROM node:18

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto de la app
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start"]