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

Vous trouverez ci-joint un wireframe de type desktop pour une représentation graphique de l'application.

## Implémentation de l'architecture MVC

1. Création des fichiers à la racine, un exemple de variable d'environnement, un .gitignore pour ne pas puch les node_modules ainsi que le .env qui contiendra nos variables sensibles et l'index.js pour l'exécution du serveur.
  
2. Initialisation de Npm puis installation des modules Express pour ouvrir un serveur local, Dotenv pour les variables d'environnements, pg pour la liaison de la base de données postgreSQL.

3. Mise en place des dossiers app pour la gestion des actions back, assets pour les fichiers statics html css et js, docs pour les documentions supplémentaires.

## Test serveur local

Création d'un html très simple avec l'ajout d'un fichier css et d'un script js pour tester localement dans un premier temps que tout fonctionne.

