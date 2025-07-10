# matcha
matcha est un projet web de la branche post-tronc commun Web & Mobile. Ce projet consiste à créer un site web SPA (Single Page Application) de rencontre permettant de matcher avec des personnes correspondant aux critères sélectionnés et ensuite de discuter avec elles. 
Ce projet a été réalisé avec [@ThibautCharpentier](https://github.com/ThibautCharpentier)

## 📋 Fonctionnalités

### ⌨️ Les Technos

* Back-end : **Node.js**
* Base de données : **PostgreSQL**
* Front-end : **React**
* Toolkit Front-end : **Tailwind CSS**

### 📍 Exigences Obligatoires
### Sécurité
- [x] Mot de passe hachés
- [x] Protection contre les injections SQL/XSS
- [x] Responsive sur tous les formats d'écran
### Inscription & Connexion
- [x] Valider l'inscription avec l'envoi d'un e-mail
- [x] Pouvoir reset le mot de passe si oublié
- [x] Pouvoir se déconnecter n'importe où
### Profil Utilisateur
- [x] Modifier ses informations personnelles
- [x] Avoir une côte de popularité publique
- [x] L'utilisateur doit être localisé par GPS
- [x] On peut liker, unliker, bloquer, signaler un utilisateur.
### Match
- [x] Une liste de profils correspond aux critères de l'utilisateur doit lui être proposée
- [x] Cette liste peut-être triée ou filtrée par âge, localisation, côte de popularité et tags d'intérêts communs
- [x] Pouvoir faire une recherche en sélectionnant pls critères comme : tranche d'âge, tranche de côte de popularité, localisation et pls tags d'intérêts
- [x] Si deux utilisateurs se likent mutuellement cela crée une connexion match entre les deux. Il peuvent alors discuter.
### Chat
- [x] Chat en temps réel
- [x] Notification de nouveau message dans toutes les pages de l'app
### Notifications
- [x] Notifications en temps réel
- [x] Notification pour like, unlike, vu profil, match


## 📷 Aperçus

### Accueils
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Accueil.png)
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Signup.png)
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Signin.png)
### Dashboard
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Dashboard.png)
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Modal_profil.png)
### Match
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Match.png)
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Match_option_avancee.png)
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Match_option_suggestions.png)
### Chat
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Conversations.png)
### Notifications
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Notifications.png)
### Paramètres
![alt-text](https://github.com/Ismerie/matcha/blob/main/preview/Parameters.png)

## 🛠️ Usage
Premièrement, vous devez créer un fichier **.env** à la racine du projet, qui ressemblera à ceci :
```
LOCAL_IP=localhost
LOCAL_IP2=127.0.0.1

#ifconfig enp4s0f0 | grep "inet" | awk "{print $2}" | head -n 1
#OU
#ip addr show enp4s0f0 | grep "inet" | awk "{print $2}" | cut -d/ -f1 | head -n 1
#Ou sur macOs
#ipconfig getifaddr en0
HOST_IP=

BACK_PORT=8000
FRONT_PORT=5173

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=matcha

#Your mail for admin session
MAIL_ADMIN1=
MAIL_ADMIN2=
MAIL_TOKEN_EXPIRATION=10m

#Put whatever you want for this one:
SECRET_TOKEN_KEY=ItIsASecretTokenKey
ADMIN_SECRET_TOKEN_KEY=ItIsAnAdminSecretTokenKey

JWT_ADMINTOKEN_EXPIRATION=15m

JWT_ACCESSTOKEN_EXPIRATION=30m
COOKIE_ACCESSTOKEN_EXPIRATION=1800000
JWT_REFRESHTOKEN_EXPIRATION=1d
COOKIE_REFRESHTOKEN_EXPIRATION=86400000

#You have to use an email communication platform to send email (like sendgrid for example) and put your settings here:
EMAIL_HOST='smtp.sendgrid.net'
EMAIL_HOST_USER='apikey'
EMAIL_HOST_PASSWORD=
EMAIL_PORT=587
EMAIL_SENDER=

```
Ensuite, exécutez le projet avec :
```
docker compose up --build
```
Si le projet est déjà construit, utilisez :
```
docker compose up
```

Ensuite, accédez à votre adresse IP locale sur le port 8080 :
```
https://localhost:5173/
```
```
https://127.0.0.1:5173/
```
