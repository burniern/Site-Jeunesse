# Jeunesse de Bière - Site Web Officiel

![Jeunesse de Bière](https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)

Site web officiel de la Jeunesse de Bière, une association dynamique organisant des événements festifs et culturels dans la commune de Bière en Suisse. Cette application web moderne combine un frontend React avec un backend PHP/MySQL.

## 📋 Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Développement](#-développement)
- [API Backend](#-api-backend)
- [Base de données](#-base-de-données)
- [Authentification](#-authentification)
- [Sécurité](#-sécurité)
- [Performance](#-performance)
- [UX/UI](#-uxui)
- [Déploiement](#-déploiement)
- [Maintenance](#-maintenance)
- [Contributeurs](#-contributeurs)
- [Licence](#-licence)

## 🌟 Présentation

La Jeunesse de Bière est une association locale fondée en 1970 qui anime la vie du village à travers diverses activités et événements. Ce site web sert de vitrine pour présenter l'association, ses membres, ses événements à venir et son histoire, tout en offrant un moyen de contact pour les visiteurs intéressés.

Le site comprend une partie publique accessible à tous les visiteurs et une interface d'administration sécurisée permettant aux responsables de l'association de gérer facilement le contenu du site.

## ✨ Fonctionnalités

### 🌐 Site public

- **Page d'accueil**
  - Carrousel d'images dynamique
  - Présentation de l'association
  - Affichage des 3 prochains événements
  - Sections animées avec Framer Motion
  - Appels à l'action pour rejoindre l'association

- **Page Membres**
  - Galerie des membres avec photos
  - Filtrage par rôle
  - Affichage des informations de contact
  - Chargement optimisé des images

- **Page Événements**
  - Calendrier interactif avec React Calendar
  - Liste des événements à venir
  - Filtrage et recherche
  - Affichage détaillé des événements

- **Page À propos**
  - Histoire de l'association
  - Valeurs et missions
  - Activités principales
  - Galerie photos

- **Page Contact**
  - Formulaire de contact avec validation
  - Informations de contact
  - Carte de localisation
  - Liens réseaux sociaux

### 🔐 Interface d'administration

- **Tableau de bord**
  - Statistiques en temps réel
  - Aperçu des derniers événements
  - Activités récentes
  - Accès rapides aux fonctionnalités

- **Gestion des membres**
  - CRUD complet des membres
  - Upload de photos avec validation
  - Attribution des rôles
  - Gestion des contacts

- **Gestion des événements**
  - Création et modification d'événements
  - Upload d'images
  - Planification avec calendrier
  - Gestion des détails et localisation

- **Gestion du carrousel**
  - Upload d'images avec prévisualisation
  - Réorganisation par drag & drop
  - Optimisation automatique des images
  - Support des URLs externes

- **Gestion des utilisateurs**
  - Création de comptes admin
  - Gestion des rôles et permissions
  - Historique des connexions
  - Sécurité renforcée

## 🛠 Technologies

### Frontend
- **React 18** - Bibliothèque UI avec hooks
- **TypeScript** - Typage statique
- **Vite** - Build tool ultrarapide
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **React Router** - Navigation
- **React Query** - Gestion d'état serveur
- **Zod** - Validation de données
- **Axios** - Client HTTP
- **HeadlessUI** - Composants accessibles
- **Lucide React** - Icônes SVG
- **React Hot Toast** - Notifications
- **date-fns** - Manipulation de dates

### Backend
- **PHP 8** - Langage serveur
- **MySQL** - Base de données
- **PDO** - Accès base de données
- **JWT** - Authentification
- **Architecture MVC**

### Outils
- **ESLint** - Linting
- **Prettier** - Formatage
- **Vitest** - Tests unitaires
- **TypeScript** - Vérification types
- **Git** - Versioning

## 📂 Architecture

```
jeunesse-biere-website/
├── api/                  # Backend PHP
│   ├── config/          # Configuration
│   ├── controllers/     # Contrôleurs MVC
│   └── index.php        # Point d'entrée API
├── public/              # Assets statiques
├── src/                 # Frontend React
│   ├── components/      # Composants React
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilitaires
│   ├── pages/          # Pages de l'app
│   └── services/       # Services API
├── tests/              # Tests unitaires
└── types/              # Types TypeScript
```

## 🚀 Installation

### Prérequis
- Node.js 16+
- PHP 8.0+
- MySQL 8.0+
- Composer
- Git

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/votre-org/jeunesse-biere-website.git
cd jeunesse-biere-website
```

2. Installer les dépendances frontend
```bash
npm install
```

3. Installer les dépendances backend
```bash
cd api
composer install
```

4. Configurer l'environnement
```bash
cp .env.example .env
# Éditer .env avec vos paramètres
```

5. Créer la base de données
```bash
mysql -u root -p
CREATE DATABASE jeunesse_biere;
exit
```

6. Lancer les migrations
```bash
php artisan migrate
php artisan db:seed
```

## 💻 Développement

### Lancer le serveur de développement
```bash
# Frontend
npm run dev

# Backend
php -S localhost:8000 -t api
```

### Tests
```bash
# Tests unitaires
npm run test

# Vérification types
npm run typecheck

# Linting
npm run lint
```

### Build production
```bash
npm run build
```

## 🔌 API Backend

Documentation complète des endpoints API :

### Authentification
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Membres
- `GET /api/members` - Liste des membres
- `POST /api/members` - Création membre
- `PUT /api/members/{id}` - Modification membre
- `DELETE /api/members/{id}` - Suppression membre

### Événements
- `GET /api/events` - Liste des événements
- `GET /api/events/upcoming` - Événements à venir
- `POST /api/events` - Création événement
- `PUT /api/events/{id}` - Modification événement
- `DELETE /api/events/{id}` - Suppression événement

### Carrousel
- `GET /api/carousel` - Images du carrousel
- `POST /api/carousel` - Ajout image
- `PUT /api/carousel/{id}` - Modification image
- `DELETE /api/carousel/{id}` - Suppression image

### Utilisateurs
- `GET /api/users` - Liste utilisateurs
- `POST /api/users` - Création utilisateur
- `PUT /api/users/{id}` - Modification utilisateur
- `DELETE /api/users/{id}` - Suppression utilisateur

## 🗄️ Base de données

### Tables principales

#### members
- `id` - Identifiant unique
- `firstName` - Prénom
- `lastName` - Nom
- `email` - Email (optionnel)
- `phone` - Téléphone (optionnel)
- `photo` - Photo de profil
- `role` - Rôle dans l'association

#### events
- `id` - Identifiant unique
- `title` - Titre
- `date` - Date
- `time` - Heure
- `location` - Lieu
- `description` - Description
- `image` - Image

#### users
- `id` - Identifiant unique
- `username` - Nom d'utilisateur
- `email` - Email
- `password` - Mot de passe (hashé)
- `role` - Rôle (Admin/Éditeur)
- `last_login` - Dernière connexion

#### carousel_images
- `id` - Identifiant unique
- `title` - Titre
- `url` - URL de l'image
- `alt` - Texte alternatif
- `order` - Ordre d'affichage

## 🔑 Sécurité

### Authentification
- JWT pour les tokens
- Hashage bcrypt des mots de passe
- Validation des sessions
- Protection CSRF
- Rate limiting

### Upload de fichiers
- Validation des types MIME
- Limite de taille (5MB)
- Noms de fichiers sécurisés
- Vérification des dimensions

### Base de données
- Requêtes préparées PDO
- Échappement des données
- Validation des entrées
- Transactions sécurisées

### Frontend
- Protection XSS
- CSP headers
- HTTPS forcé
- Sanitization des données

## 🚀 Performance

### Optimisations frontend
- Code splitting
- Lazy loading
- Compression des assets
- Cache des images
- Prefetching

### Optimisations backend
- Cache des requêtes
- Optimisation SQL
- Pagination
- Compression gzip

### Images
- Redimensionnement automatique
- Format WebP
- Lazy loading
- Cache navigateur

## 🎨 UX/UI

### Design
- Interface responsive
- Thème personnalisé
- Animations fluides
- Composants accessibles

### Accessibilité
- ARIA labels
- Navigation clavier
- Contraste suffisant
- Messages d'erreur clairs

### Feedback
- Notifications toast
- Indicateurs de chargement
- Messages de confirmation
- Validation en temps réel

## 🚢 Déploiement

### Prérequis serveur
- PHP 8.0+
- MySQL 8.0+
- Node.js 16+
- Nginx/Apache
- SSL/TLS

### Configuration serveur
```nginx
server {
    listen 80;
    server_name jeunessebiere.ch;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jeunessebiere.ch;

    ssl_certificate /etc/letsencrypt/live/jeunessebiere.ch/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jeunessebiere.ch/privkey.pem;

    root /var/www/jeunesse-biere/dist;
    index index.html;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires max;
        add_header Cache-Control "public, no-transform";
    }
}
```

### Déploiement
```bash
# Build frontend
npm run build

# Copier les fichiers
rsync -avz --delete dist/ user@server:/var/www/jeunesse-biere/dist/
rsync -avz --delete api/ user@server:/var/www/jeunesse-biere/api/

# Migrations base de données
php artisan migrate --force
```

## 🔧 Maintenance

### Sauvegardes
- Base de données quotidienne
- Fichiers uploadés
- Configurations
- Logs

### Mises à jour
- Dépendances npm
- Composer packages
- PHP/MySQL
- SSL certificates

### Monitoring
- Logs d'erreurs
- Performances
- Espace disque
- Sécurité

## 👥 Contributeurs

- **Développement** : [Nicolas Burnier](https://ch.linkedin.com/in/nicolas-burnier-16078718a)
- **Design** : Jeunesse de Bière
- **Photos** : [Unsplash](https://unsplash.com)

## 📄 Licence

© 2025 Jeunesse de Bière - Tous droits réservés

---

Pour toute question ou suggestion, contactez [contact@jeunessebiere.ch](mailto:contact@jeunessebiere.ch)