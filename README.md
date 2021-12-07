# Baby Derfy Manager

Le Baby Derfy Manager est une application simple de gestion de match pour le baby foot de manière collaborative.  
L'application sera faite en Javascript Vanilla, nodeJs, PosgreSQL (sans ORM), sous environnement Linux.

## Définition des besoins

L'application devra contenir au moins ces fonctionnalités:

 1. Création d'une partie.
 2. Suppression d'une partie.
 3. Terminer une partie.
 4. Dans la liste, différencier des autres les parties terminées.
 5. Avoir un compteur des parties non terminées.
 6. À chaque modification, création ou suppression, propagation en temps réel sur les autres clients connectés.

Nous aurons besoin de rendu Html pour le contenu, de Css pour le style et la forme, de script js pour les interactions pour le front.  
Nous aurons également besoin d'un serveur, d'un router, de contrôleurs ainsi qu'une base de données.

## Maquettage

Vous trouverez ci-joint dans le dossier "docs" un wireframe de type desktop pour une représentation graphique de l'application.

## Implémentation de l'architecture MVC

 1. Création des fichiers à la racine, un exemple de variable d'environnement, un .gitignore pour ne pas puch les node_modules ainsi que le .env qui contiendra nos variables sensibles et l'index.js pour l'exécution du serveur.
 2. Initialisation de Npm puis installation des modules Express pour ouvrir un serveur local, Dotenv pour les variables d'environnements, pg pour la liaison de la base de données postgreSQL.
 3. Mise en place des dossiers app pour la gestion des actions back, assets pour les fichiers statics html, css, les photos et js, docs pour les documentions supplémentaires.

## Test serveur local

Création d'un html très simple avec l'ajout d'un fichier css et d'un script js pour tester localement dans un premier temps que tout fonctionne.

## Base de données

Etant donné que l'application doit être simple, la base de données ne comportera qu'une entité "play", celle-ci contiendra les champs :

 1. id, qui sera l'identifiant pour chaque ajout.
 2. status, pour définir l'etat de la partie (true pour dire que la partie est terminée).
 3. score_A et score_B, défini les scores de chaque joueur une fois la partie terminée.
 4. team_A et team_B, le nom de chaque joueur.
 5. created_at, date et heure de création de partie.
 6. updated_at, date et heure pour une modification de partie (pour la fin de partie par exemple).

Si nous devions prévoir l'évolution de l'application, nous aurions au moins l'entité supplémentaire "player", par une relation N:N avec l'entité "play", et donc la table de liaison play_has_player.  
Il pourrait aussi y avoir la séparation des scores par une nouvelle entité.

## Contenu

Notre html est complété par des liens pour les fichiers css, la police de caractère, des script js, du contenu comme une nav barre, un template qui nous servira de modèle pour chaque nouvel ajout de jeu ainsi que deux modals.  
La première modal sera affiché via un bouton d'ajout de jeu pour nous permettre de renseigner le nom des joueurs, la deuxième sera affichée par un bouton de validation de partie afin de mettre fin au jeu et d'y renseigner les scores respectifs.

## Interaction Javascript

La base de ce script js sera automatiquement exécuté par la fonction init, et uniquement lorsque tout le fichier est entièrement chargé par le DOM.  
Certaines fonctions comme les écouteurs d'événements ou les sockets seront ainsi en place dès l'ouverture de l'application.  
Les fonctions qui utiliseront les requêtes par fetch seront asynchrones, cela nous permettra d'attendre le retour des actions serveur (communication base de données), pour ensuite transformer ces datas avant le rendu.  
Les fonctions auront des noms clairs pour la compréhension de tous et un message d'erreur sera affiché afin de signaler à l'utilisateur si un problème survient.

## Gestion de base de données

Pour pouvoir interagir avec la base de données nous utiliserons les contrôleurs.  
Ainsi, lorsque le front déclenchera une requête via la fonction fetch (une route exécuté par une URL), le route exécutera à son tour la méthode qui lui est affiliée. Cette méthode fera une action comme par exemple envoyer une requête SQL pour récupérer les données de la table "play", et les renverras ensuite au Javascript.  
Les requêtes SQL seront contenu dans le fichier datamapper.  
Une gestions d'erreur primaire sera en place pour chaque méthode.

## Web sockets

"À chaque modification, création ou suppression, propagation en temps réel sur les autres clients connectés."  
Pour pouvoir se faire, nous utiliserons ici des web sockets, le principe est que lorsqu'une modification est faite en base de données, nous envoyons un message au serveur, qui à son tour renverra ce massage à tous les autres navigateurs. Lorsque ce message arrive, nous supprimons tout le contenu des jeux, et après un nouvel appel à la base de données (pour recevoir les modifications faites) nous recréons le contenu.  
De ce fait pour chaque modification en base, nimporte quel utilisateur va le changement opérer sans a avoir besoin de rafraichir la page.

## Fonctionnalitées supplémentaires

Le bonus de cet exercice est d'y placer un chat de communication en live, cependant l'ajout de filtres m'a paru être un plus pour pouvoir différencier les parties, nous pourrons filtrer les parties terminées, les parties non terminées ou bien voir toute la liste des parties (terminées et non terminées) par ordre chronologique et par statut (sans interférer les autres utilisateurs).  
Concernant le chat nous utilisons les web sockets déjà en place, ce chat sera commun avec tous les internautes connectées étant donné que nous ne pouvons pas nous identifier. À noter que le chat est pleinement fonctionnel une fois le pseudo (nickname) renseigné.

# Installation de l'application

## Mise de place du repo et config

Dans un premier temps de-zipper le document puis ouvrir l'IDE (VSCode).
Si vous ne disposez pas du document zip cloner le repo github dans un terminal :  
git clone https://github.com/derfy86/Baby-Foot-Manager.git  
Placer vous à la racine du projet avec votre IDE et installer les packages npm par la commande npm i.  
Créer une base de données local via postgreSQL ainsi qu'un utilisateur (en commençant par l'utilisateur) :

 1. psql -U postgres
 2. CREATE USER [nom du propriétaire] LOGIN PASSWORD '[votre mot de passe]';
 3. CREATE DATABASE [nom de votre base] OWNER [nom du propriétaire];

Sortir de psql avec ctrl + D et créer le contenu de la base de données via le fichier docs/database.sql :  
psql -U [nom du propriétaire] -d [nom de la base de données] -f docs/database.sql  
Créer un fichier .env à la racine du projet et copier le contenu du .env.example en modifiant les champs : 
PORT=[votre port] (fonctionne si cette ligne n'est pas présente, port 3000 par défault)  
DATABASE_URL=postgresql://[nom du propriétaire]:[mot de passe du propriétaire]@[localhost]:[5432]/[nom de la base de données]  
Ne pas modifier le port 5432 pour une base local psql.

## Ouverture de l'application

Une fois le chapitre mise en place du repo terminé, placez vous à la racine du projet puis, dans un terminal, faites la commande :  
node server.js  
Cette commande ouvre le serveur sur le port que vous avez choisi dans le .env, vous devriez voir apparaître dans le terminal : Listening on 3000  
Vous n'avez plus qu'à ouvrir votre navigateur (Chrome ou Firefox) et entrer comme URL : localhost:3000

## Utilisation de l'application

Une fois présent dans le navigateur sur localhost:3000, l'application est visible.  
Commencer par créer une nouvelle partie grâce au bouton add a new game, et y renseigner le nom des joueurs.  
Un élément apparaît contenant les informations de la partie en cours, vous pouvez ensuite supprimer la partie ou terminer la partie.  
Pour terminer la partie cliquer sur l'icône "check" à droite de la partie concerné puis renseigner les scores des joueurs.  
Les parties en cours sont de couleurs bleues, les parties terminées avec des scores en match nul (0 - 0 par exemple) sont en gris, et les parties terminées avec un score gagnant et perdant sont vert et rouge (vert pour le vainqueur).  
Vous pouvez également filtrer les parties en cliquant sur les boutons de la nav barre de gauche.  
Ces boutons vous indiquent le nombre de parties par rapport au filtre.  
Le bouton blanc vous affiche toutes les parties (en cours et terminées), le bouton rouge vous affiche les parties non terminées, enfin le bouton vert vous affiche les parties terminées.  
Le chat est ouvert à tous et commun à tous les utilisateurs.  
Pour une bonne utilisation n'oubliez pas de renseigner votre pseudo, vous verrez ainsi vous messages à gauche et les messages des autres utilisateurs à droite. Lorsqu'un utilisateur ne renseigne pas de pseudo il est alors nommé "Anonymous" et son message appraît automatiquement à droite.  

## Enjoy xD