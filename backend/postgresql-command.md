Après avoir ouvert Postgres.app dans le terminal =>

# Commande de bases de la BDD

psql = rentrer dans psql

actions :

- run : psql -u postgres; (?)
- create : create database test;
- delete database : drop database test;
- deleta table : drop table test;
- connect to database : \c databasename;
- disconnect and back to menu : \c postgres;

listes :

- des databases : \list
- des utilisateurs : \du or \dg
- des tables : \dt
- des view : \dv
- des tables (+ size) \dt+
- accès privilège : \dp

Creation User Postgres : avec ou sans mdp // user root = tout les droit de la Database :

- createuser --interactive --pwprompt
- CREATE USER username SUPERUSER WITH PASSWORD 'passwordstring';
- CREATE USER username SUPERUSER;

# Commande de gestion de la BDD

# Création table Utilisateur :

> le auto_increment ne fonctionne pas pour l'id c'est SERIAL sur postgresql

CREATE TABLE utilisateur (
nom VARCHAR(100),
prenom VARCHAR(100),
email VARCHAR(255) NOT NULL UNIQUE
);

Avec id :
CREATE TABLE utilisateur (
id SERIAL,
nom VARCHAR(100),
prenom VARCHAR(100),
email VARCHAR(255) NOT NULL UNIQUE
);

on pourrait même rajouter une ligne vrai ou faux pour admin =
admin BOOLEAN DEFAULT false

info commande :
varchar(25) = nombre de caractère = 25 caractère
FLOAT = chiffre decimaux = 3.5

# Création table Aliment :

CREATE TABLE aliment2 (
id SERIAL PRIMARY KEY,
nom VARCHAR(100) NOT NULL,
glucides FLOAT,
lipides FLOAT,
proteines FLOAT,
kcal INTEGER NOT NULL
);

on pourrait même rajouter une ligne vrai ou faux pour le bio =
bio BOOLEAN DEFAULT false

# Insert = Add un Utilisateur dans la BDD

Add 1 utilisateur :
INSERT INTO "utilisateur" ("nom", "prenom", "email")
VALUES
('Durant', 'Quentin', 'quentin@gmail.com');

Add + utilisateur :
INSERT INTO "utilisateur" ("nom", "prenom", "email")
VALUES
('Gres', 'Mathilde', 'mg91@hotmail.fr'),
('Smith', 'John', 'johnsmith@gmail.com'),
('Durant', 'Quentin', 'quentin@gmail.com'),
('Bolot', 'Thibaut', 'thib.b@yahoo.fr');

Add + aliments :
INSERT INTO "aliment2" ("nom", "glucides", "lipides", "proteines", "kcal", "famille_id")
VALUES
('poire', 10, 0.2, 0.4, 52, 1),
('pomme', 11.3, 0.2, 0.1, 53, 1),
('oeuf', 0.7, 10.3, 12.3, 145, 2),
('amandes', 1.5, 53.4, 25.4, 634, 3);

# Delete = Supprimer éléments

DELETE FROM utilisateur WHERE nom = 'Durant';

# Update = Modifier donnés élément

UPDATE utilisateur SET email = 'quentindo@yahoo.fr' WHERE nom = 'Durant';

# Select = Accéder à l'information

Afficher toutes les infos d'une table :
SELECT _ FROM utilisateur;
SELECT _ FROM aliment;

Afficher 2 lignes max en partant du début :
SELECT \* FROM aliment LIMIT 2;

Afficher aux infos précisé d'une table :
SELECT "nom", "prenom" FROM utilisateur;
SELECT "kcal" FROM aliment;

Afficher 1 ligne target :
SELECT _ FROM aliment WHERE id = 3;
SELECT _ FROM aliment WHERE nom = 'poire';

Afficher ligne remplisse condition (opérateur / contient) :
SELECT _ FROM aliment WHERE kcal > 100;
SELECT _ FROM utilisateur WHERE email LIKE '%gmail.com';
SELECT \* FROM utilisateur WHERE prenom LIKE 'M%';

Afficher tout mais trier selon un critère (ordre alphabétique / Kcal croissant / kcal decroissant)
SELECT _ FROM aliment ORDER BY nom ASC;
SELECT _ FROM aliment ORDER BY kcal ASC;
SELECT \* FROM aliment ORDER BY kcal DESC;

Afficher tout selon 1 critère + trier :
SELECT \* FROM aliment WHERE kcal < 90 ORDER BY kcal DESC;

# Compter plutôt qu'afficher les résultats

SELECT COUNT(\*) FROM utilisateur WHERE email LIKE '%gmail.com';

# Divers Exemple (average / somme / max / min)

SELECT AVG(kcal) FROM aliment WHERE kcal >= 60;
SELECT SUM(kcal) FROM aliment;
SELECT MIN(kcal) FROM aliment;
SELECT MAX(kcal) FROM aliment;

# Create VIEW + Use it = résumé en 1 mot une selection (permet adapter droits d'accès en fonction du rôle)

CREATE VIEW utilisateurs*gmail AS SELECT * FROM utilisateur WHERE email LIKE '%gmail.com';
SELECT \_ FROM utilisateurs_gmail;
To delete : Drop view utilisateurs_gmail;

Exemple :
CREATE VIEW utilisateurs*gmail AS SELECT * FROM utilisateur WHERE email LIKE '%gmail.com';
CREATE VIEW utilisateurs*admin AS SELECT * FROM utilisateur WHERE admin = 'true';

# JOIN - Montrer la liste de relations - BDD relationnelles

explication des type de join (inner / left / right/ ...) : https://www.geeksforgeeks.org/postgresql-joins/

# Table langue que l'on va join à la table utilisateur

CREATE TABLE langue (
id INTEGER,
langue varchar(100) NOT NULL
);

# on y insert nos données l'id est l'utilisateur auquel on reliera la langue

INSERT INTO "langue" ("id", "langue")
VALUES
('1', 'français'),
('2', 'français'),
('3', 'français'),
('5', 'anglais'),
('8', 'anglais');

On dit d'associer la langue utilisateur via l'id des 2 tables qui correspond à une seule personne :
SELECT \* FROM utilisateur
JOIN langue
ON utilisateur.id = langue.id;

Avec :
LEFT JOIN : on exclue pas les utilisateur qui ne sont pas dans le tableau langue
RIGHT JOIN : si on a des infos langue sur des utilisateur non existant on exclue pas les donnés
JOIN : uniquement correspondance
FULL JOIN : on exclue ni l'un ni l'autre

# ALTER - Modifier structure d'une table

Ajouter / Supprimer une colone :
ALTER TABLE aliment ADD vitamines_c FLOAT;
ALTER TABLE aliment DROP vitamines_c;

Changer le type de colone :
ALTER TABLE aliment MODIFY kcal FLOAT; )

Renommer une colone = sucre en sucres :
ALTER TABLE aliment CHANGE sucre sucres FLOAT;

Renommer une table :
ALTER TABLE aliment2 RENAME TO aliment;

# RELATION = plusieurs objets sont dans une autre table aussi car point commu

Point commun = famille d'aliment / lieux de vente / réaction alergique

1 A PLUSIEUR :

CREATE TABLE famille (
id serial UNIQUE,
nom VARCHAR(100) NOT NULL UNIQUE
);

Relation un à plusieurs :
Un aliment peut faire partie que d'une seule famille plusieurs aliment peuvent être dans cette famille
INSERT INTO famille ("nom") VALUES ('fruit');

On rajoute la colone famille dans la table aliment :
ALTER TABLE aliment2 ADD famille_id INTEGER;

On ajoute le liens qui relie à l'info mais ne remplis pas le tableau attention :

ALTER TABLE aliment
ADD FOREIGN KEY (famille_id)
REFERENCES famille (id)
ON DELETE SET NULL;

3 options delete :

- cascade : risqué mais répendu = on supprime pomme et poire et si on delete famille fruit
- SET NULL : Si delete fruits remplacer “famille_id” de “pomme” + “poire” comme NULL
- RESTRICT // ou // NO ACTION : empêche le delete des pomme et poire non supprimé

Remplir le tableau :
UPDATE aliment SET famille_id = '2' WHERE nom = 'oeuf';

PLUSIEURS A PLUSIEURS :

CREATE TABLE lieu (
id SERIAL UNIQUE,
nom VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
type VARCHAR(100) NOT NULL
);

Insertion donné :
INSERT INTO lieu (nom, type) VALUES ('Carrefour City', 'supermarché');
INSERT INTO lieu (nom, type) VALUES ('Le bon marché', 'marché');

Table de liaison / définis via ID que des infos sont des infos présente sur d'autres tableaux :
CREATE TABLE aliment_lieu (
aliment_id INT NOT NULL,
lieu_id INT NOT NULL,
FOREIGN KEY (aliment_id) REFERENCES aliment2 (id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (lieu_id) REFERENCES lieu (id) ON DELETE RESTRICT ON UPDATE CASCADE,
PRIMARY KEY (aliment_id, lieu_id)
);

On remplis le tableaux (si on rentre un id de lieu qui n'existe pas on aura un msg d'erreur) :
INSERT INTO aliment_lieu (aliment_id, lieu_id) VALUES ('4', '2');

Obtenir les lieux ou l'aliment ID 1 est dispo :
SELECT \* FROM aliment
JOIN aliment_lieu ON aliment.id = aliment_lieu.aliment_id
JOIN lieu ON lieu.id = aliment_lieu.lieu_id
WHERE aliment.id = 1;
