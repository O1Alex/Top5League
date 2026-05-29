# Top5League

# Présentation
Application web Full Stack de Fantasy Basket permettant aux utilisateurs de créer et gérer leur Top5 du mois puis de comparer celui-ci avec ce qu'il se sera réellement passé au cours du mois pour enfin désigner un vainqueur.

Le projet est composé :
- d’un backend Node.js / Express
- d’un frontend React avec Vite
- d’une base de données MySQL
- d’une API REST sécurisée



# Les technologies utilisées : 

## Pour le backend :
- Node.js
- Express.js
- MySQL2
- Sequelize
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- Helmet
- CORS
- Express-validator
- Jest / Supertest


## Pour le frontend :
- React
- React Router DOM
- Vite
- Axios
- Bootstrap
- Bootstrap Icons
- Sass
  


# Installation du projet :

Pour ce faire, une fois le dépôt GitHub cloné depuis le terminal (git clone https://github.com/01Alex/Top5League.git) et une fois dans le projet (cd Top5League) il faudra procéder en 2 étapes en s'occupant d'abord du back puis du front. RTout cela se passera directement dans le terminal de votre éditeur de code.


## Pour le backend :
- cd backend (entrer dans le dossier backend)
- npm install (installation des dépendances)
- npm run dev (lancement du backend)

Une fois cela fait, il faudra ensuite créer un fichier .env à la racine du backend dans lequel figurera les informations ci dessous qui seront indispensable mais non présente dans le dépôt pour une raison évidente de sécurité:

SERVER_HOST=http://localhost
SERVER_PORT=3000
DB_HOST=localhost
DB_USER=yourdbuser
DB_PASSWORD=yourpassword
DB_PORT=3306
DB_NAME= "Top5League"
JWT_SECRET=yoursecretkey
NODE_ENV=developpement


## Pour la base de données:
- npm run init-db (initialisation de la base de données)
- npm run seed-db (alimentation de la base de données)


## Pour le frontend : 
- cd .. (pour revenir a la racine du projet)
- cd frontend (entrer dans le dossier frontend)
- npm install (installation des dépendances)
- npm run dev (lancement du frontend)


# Création des utilisateurs

Une fois le projet lancé, il est conseillé de créer plusieurs comptes directement depuis l’interface de l’application.
Le premier compte créé devra ensuite être modifié manuellement dans la base de données afin de lui attribuer le rôle `admin`.
Cette méthode permet de garantir le hashage sécurisé des mots de passe via bcrypt.

Voici quelques exemple de compte à créer (bien créer en premier le compte administrateur):

(username, email, password, role, favorite_player) :

('admin', 'admin@top5league.test', 'admin123', 'admin', NULL),
('lukaFan', 'lukafan@top5league.test', 'luka123', 'user', 'Luka Doncic'),
('giannisFan', 'giannisfan@top5league.test', 'giannis123', 'user', 'Giannis Antetokounmpo'),
('curryNation', 'currynation@top5league.test', 'curry123', 'user', 'Stephen Curry'),
('jokicMVP', 'jokicmvp@top5league.test', 'jokic123', 'user', 'Nikola Jokic'),
('kdSniper', 'kdsniper@top5league.test', 'kd123', 'user', 'Kevin Durant'),
('dameTime', 'dametime@top5league.test', 'tatum123', 'user', NULL),
('bronLegacy', 'bronlegacy@top5league.test', 'bron123', 'user', 'LeBron James'),
('anonymousHooper', 'anonymoushooper@top5league.test', 'anonymous123', 'user', NULL);