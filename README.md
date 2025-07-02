# Sajda frontend

Application mobile **Sajda** développée avec [React Native](https://reactnative.dev/) et [Expo](https://expo.dev/).

---

## Présentation

Cette application permet d'accéder aux fonctionnalités de la plateforme Sajda : horaires de prières, actualités, gestion de mosquées, retours utilisateurs, notifications, etc.  
Elle communique avec l'API backend Node.js/MariaDB décrite dans le [README du backend](../backend/README.md).

---

## Installation

### 1. Cloner le dépôt

```sh
git clone https://github.com/ouss17/sajda-front
cd sajda-front
```

### 2. Installer les dépendances

```sh
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
API_URL=<url_de_votre_api>
```

Remplacez `<url_de_votre_api>` par l'URL de votre backend (ex : http://localhost:3000).

---

## Lancement de l'application

Pour démarrer l'application en mode développement :

```sh
expo start
```

Scannez le QR code affiché avec l'application **Expo Go** sur votre téléphone pour tester l'application.

---

## Structure du projet

- `assets/` : images, icônes, ressources statiques
- `components/` : composants réutilisables (menus, etc.)
- `context/` : contextes React pour la gestion d'état global
- `modules/` : modules métiers (ex : gestion utilisateur)
- `pages/` : pages principales de l'application (Horaires, Feedback, Actus, etc.)
- `reducers/` : reducers Redux pour la gestion d'état
- `App.jsx` : point d'entrée principal de l'application

---

## Dépendances principales

- **React Native**
- **Expo**
- **Redux Toolkit**
- **React Navigation**
- **OneSignal** (notifications push)
- **Axios** ou `fetch` (requêtes API)

---

## Notes

- L'application nécessite un backend Sajda fonctionnel (voir [README backend](../backend/README.md)).
- Pour les notifications push, configurez vos clés OneSignal dans le code ou via l'environnement Expo.
- Pour la publication sur les stores, suivez la documentation