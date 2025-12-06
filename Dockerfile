# CAMBIO IMPORTANTE: Usamos Node 20 en lugar de 18
FROM node:20-alpine

# Establecemos la carpeta de trabajo
WORKDIR /app

# Copiamos los archivos de configuración
COPY package.json ./
# Si existe package-lock.json o yarn.lock, descomenta la linea necesaria:
# COPY package-lock.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código (incluyendo la carpeta components si existe)
COPY . .

# Construimos la aplicación
RUN npm run build

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "preview", "--", "--host", "--port", "3000"]
