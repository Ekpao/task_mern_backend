# 1. On prend une image Node.js stable
FROM node:18-alpine

# 2. On crée le dossier de l'application dans le conteneur
WORKDIR /usr/src/app

# 3. On copie les fichiers de dépendances
COPY package*.json ./

# 4. On installe les dépendances
RUN npm install --production

# 5. On copie le reste du code du backend
COPY . .

# 6. On expose le port utilisé par ton serveur (ex: 5000 ou celui de ton app)
EXPOSE 5000

# 7. La commande pour lancer ton serveur backend
CMD ["npm", "start"]