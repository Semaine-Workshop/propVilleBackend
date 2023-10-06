# propVilleBackend
## Guide de lancement de l'API: 
Pour lancer l'API vous devez suivre les étapes suivantes:  
- Installer NodeJS (https://nodejs.org/en/download/)  
- Lancez la commande `npm install` dans le dossier de l'API  
- Configurer le fichier config.json avec les informations de votre base de données
- Lancez la commande `npm start` dans le dossier de l'API 

## Guide d'utilisation de l'API:
Par défaut l'API est lancé sur le port 4201.
Vous pouvez l'utiliser avec les routes suivantes:

**Users:**
```
/get/user
    renvois tout les user
    need: **none**
```
```	
/get/user/id
    renvois un user en fonction de son id
    need: **id**
```
```
/get/user/email
    renvois un user en fonction de son email
    need: **email**
```
```
/get/user/phone
    renvois un user en fonction de son numéro de téléphone
    need: **phone**
```
```	
/post/user/          
    créé un user
    need: **nom**, **prenom**, **email**, **phone**, **password**, **password2**
    (notes: **password** et **password2** permette la vérification du mot de passe)
```
```	
/delete/user/id      
    supprime un user
    need: **id**
```

**Roles:**
```
/get/Roles
    renvois tout les roles
    need: **none**
```

**Reports:**
```
/get/Reports
    renvois tout les reports
    need: **none**
```	
```	
/get/Reports/id
    renvois un report 
    need: **id**
```
```
/get/Reports/idUser
    renvois tout les reports d'un utilisateur
    need: **idUser**
```
```
/get/Reports/date
    renvois tout les reports d'une date spécifique
    need: **date**
```
```
/post/Reports        
    créé un report
    need: **idUser**, **info**, **localisation**
    (notes: **info** correspond à la photo ou à la description du problème)
```