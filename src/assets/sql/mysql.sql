DROP TABLE tasks;

CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    done BOOLEAN DEFAULT FALSE,
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    titre VARCHAR(100),
    description TEXT
);

-- 10 inserts pour la table tasks (MySQL)
INSERT INTO tasks (done, datetime, titre, description)
VALUES (FALSE, '2025-10-15 09:00:00', 'Faire les courses', 'Acheter du lait, des œufs et du pain pour la semaine.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (TRUE, '2025-10-14 14:30:00', 'Envoyer le rapport', 'Envoyer le rapport trimestriel au client avant 16h.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (FALSE, '2025-10-16 10:15:00', 'Appeler le fournisseur', 'Confirmer la livraison des matières premières.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (TRUE, '2025-10-13 16:45:00', 'Nettoyer le bureau', 'Ranger les dossiers et trier les documents.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (FALSE, '2025-10-17 11:00:00', 'Préparer la réunion', 'Créer une présentation pour la réunion de lundi.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (TRUE, '2025-10-12 08:30:00', 'Payer les factures', 'Payer la facture d’électricité et d’internet.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (FALSE, '2025-10-18 15:00:00', 'Aller chez le médecin', 'Rendez-vous pour le contrôle annuel.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (TRUE, '2025-10-11 13:20:00', 'Répondre aux emails', 'Répondre aux emails urgents de la boîte de réception.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (FALSE, '2025-10-19 09:30:00', 'Planifier le projet', 'Établir un calendrier pour le nouveau projet.');

INSERT INTO tasks (done, datetime, titre, description)
VALUES (TRUE, '2025-10-10 17:00:00', 'Faire du sport', 'Aller courir au parc pendant 30 minutes.');


SELECT * FROM tasks;