# Usamos una imagen ligera de Node.js
FROM node:18-alpine

# Establecemos la carpeta de trabajo
WORKDIR /app

# Copiamos los archivos de configuración primero (para aprovechar la caché)
COPY package.json ./
# Si tienes package-lock.json descomenta la siguiente línea:
# COPY package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación
RUN npm run build

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para iniciar la app en modo preview
CMD ["npm", "run", "preview", "--", "--host", "--port", "3000"]
