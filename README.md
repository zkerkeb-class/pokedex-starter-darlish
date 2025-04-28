## Concepts à Comprendre
1. REST API
   - Méthodes HTTP (GET, POST, PUT, DELETE)
   - Codes de statut HTTP
   - Structure des URL
   - CORS (Cross-Origin Resource Sharing)

2. Express.js
   - Routing
   - Middleware
   - Gestion des requêtes et réponses
   - Configuration CORS

3. Sécurité de Base
   - Validation des entrées
   - Authentification
   - Gestion des erreurs
   - Politiques CORS

## Configuration CORS
CORS (Cross-Origin Resource Sharing) est un mécanisme qui permet à de nombreuses ressources (polices, JavaScript, etc.) d'une page web d'être demandées à partir d'un autre domaine que celui du domaine d'origine.

Pour utiliser l'API depuis un autre domaine :
1. L'API est configurée avec CORS activé
2. Toutes les origines sont autorisées dans cette version de développement
3. En production, vous devriez restreindre les origines autorisées

Pour une configuration plus restrictive, vous pouvez modifier les options CORS :

```javascript
app.use(cors({
  origin: 'https://votre-domaine.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Ressources Additionnelles
- [Documentation Express.js](https://expressjs.com/fr/)
- [Guide des Status HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)

## Support
Pour toute question ou problème :
1. Vérifiez la documentation
2. Consultez les messages d'erreur dans la console
3. Demandez de l'aide à votre formateur

## Prochaines Étapes
- Ajout d'une base de données (MongoDB)
- Implémentation de tests automatisés
- Déploiement de l'API
- Documentation avec Swagger

## Gestion des Fichiers Statiques
Le serveur expose le dossier `assets` pour servir les images des Pokémon. Les images sont accessibles via l'URL :
```
http://localhost:3000/assets/pokemons/{id}.png
```

Par exemple, pour accéder à l'image de Pikachu (ID: 25) :
```
http://localhost:3000/assets/pokemons/25.png
```

### Configuration
Le middleware `express.static` est utilisé pour servir les fichiers statiques :
```javascript
app.use('/assets', express.static(path.join(__dirname, '../assets')));
```

### Sécurité
- Seuls les fichiers du dossier `assets` sont exposés
- Les autres dossiers du projet restent inaccessibles
- En production, considérez l'utilisation d'un CDN pour les fichiers statiques













Pokédex - Projet Fullstack
Bienvenue sur le projet Pokedex Fullstack réalisé avec un Backend Node.js/Express et un Frontend React.js ! Ce projet permet de consulter, filtrer, modifier et supprimer des Pokémons ainsi que des Pokémons Shinys, avec système d'authentification et animations ludiques.
________________________________________
 Installation et démarrage du projet
1. Installer les dépendances Backend :
bash
CopierModifier
cd backend
npm install
Dépendances principales Backend :
•	express
•	mongoose
•	cors
•	dotenv
•	bcryptjs
•	jsonwebtoken
•	nodemon (en dev)
________________________________________
2. Installer les dépendances Frontend :
bash
CopierModifier
cd ../frontend
npm install
Dépendances principales Frontend :
•	react
•	react-router-dom
•	axios
•	canvas-confetti (pour l'animation de feu d'artifice)
________________________________________
3. Configurer les variables d'environnement :
Dans le dossier backend/, créez un fichier .env et ajoutez :
env
CopierModifier
MONGO_URI=ton_url_mongodb
JWT_SECRET=ton_secret_pour_jwt
FRONTEND_URL=http://localhost:5173
________________________________________
4. Lancer le Backend :
bash
CopierModifier
npm run dev
5. Lancer le Frontend :
bash
CopierModifier
npm run dev
________________________________________
 Technologies utilisées
•	Frontend : React.js (Vite), Axios, Canvas-Confetti
•	Backend : Node.js, Express.js, MongoDB (Mongoose)
•	Authentification : JWT (JSON Web Token), BcryptJS
•	Design : CSS Flexbox, Mode Sombre
•	Animations : Canvas Confetti 
________________________________________
 Documentation de l'API
 Routes d'authentification :
•	POST /api/auth/register : Inscription d'un nouvel utilisateur
•	POST /api/auth/login : Connexion d'un utilisateur
•	GET /api/protected : Accès à une route privée (authentifiée)
 Routes Pokémons :
•	GET /api/pokemons : Récupérer tous les Pokémons
•	GET /api/pokemons/:id : Récupérer un Pokémon par ID
•	POST /api/pokemons : Ajouter un nouveau Pokémon
•	PUT /api/pokemons/:id : Modifier un Pokémon existant
•	DELETE /api/pokemons/:id : Supprimer un Pokémon
_____________________________________
 Démonstration vidéo
Vous pouvez retrouver la démonstration complète du projet sur YouTube :
[Pokémon - You](https://www.youtube.com/watch?v=rBqqqXF_Pnk)
