# Challenge Front-End : Configuration de la page Campagne

Ce projet est une implémentation d'une interface de configuration de campagne marketing, réalisée dans le cadre d'un challenge technique pour un poste de développeur front-end. L'objectif était de construire une page riche et dynamique permettant à un utilisateur de paramétrer une campagne de A à Z, en utilisant des technologies modernes et en respectant des contraintes précises.

<img width="1919" height="814" alt="Capture d'écran 2025-08-03 175947" src="https://github.com/user-attachments/assets/668dee9b-d0de-4ef4-988c-7f9412cda99b" /><img width="1918" height="907" alt="Capture d'écran 2025-08-03 180001" src="https://github.com/user-attachments/assets/55009f3b-5fc2-43d5-af9a-165f3b7bb023" /><img width="1919" height="874" alt="Capture d'écran 2025-08-03 180013" src="https://github.com/user-attachments/assets/584f53ef-6195-487a-810a-95f6a0545643" />


---

## 🎯 Fonctionnalités Implémentées

-   En-tête et Navigation :
    -   Ouverture de modales pour les actions principales (Code PIN, QR Code).
    -   Liaison du bouton "Sauvegarder" à la soumission globale du formulaire.
    -   Header entièrement responsive.

-   Système d'Alertes :
    -   Affichage d'alertes contextuelles (ex: PIN non configuré, infos).
    -   Composant d'alerte personnalisé fidèle à la maquette.

-   Organisation des Actions :
    -   Liste dynamique des actions à réaliser par les clients.
    -   Réorganisation des actions par glisser-déposer (Drag and Drop).
    -   Gestion de différents types d'actions et détection des doublons.

-   Sélection du Type de Jeu :
    -   Interface de sélection visuelle entre 4 types de jeux.
    -   Logique de désactivation de la sélection pour les profils "BASIC".

-   Personnalisation du Jeu :
    -   Zone d'upload de logo avec support du glisser-déposer.
    -   Champs de sélection de couleurs avec validation de format (hexadécimal).
    -   Logique de désactivation pour les profils "BASIC".

-   Configuration des Récompenses :
    -   Gestion dynamique des gains (ajout, modification, suppression).
    -   Logique pour le mode "100% Gagnant" : ajout/suppression automatique du gain "Perte" et validation d'au moins un gain illimité.

-   Conditions de Récupération :
    -   Options globales pour conditionner la récupération des cadeaux.
    -   Affichage d'un champ conditionnel pour le montant d'achat minimum.
    -   Tableau des conditions synchronisé avec la liste des gains configurés.

---

## ⚙️ Choix Techniques et Architecture

### Stack Technologique

-   **Framework :** React 19.1
-   **Langage :** TypeScript
-   **Build Tool :** Vite
-   **UI :** Material-UI (MUI) v5
-   **Gestion de Formulaires :** `react-hook-form`
-   **Validation de Schéma :** `zod`
-   **Drag & Drop :** `@dnd-kit`
-   **Upload de Fichiers :** `react-dropzone`
-   **Génération d'ID :** `uuid`

### Architecture

Le projet est structuré autour d'une **page principale unique (`CampaignConfigurationPage`)** qui agit comme un "smart component". Elle centralise la logique du formulaire et la gestion de l'état global.

-   **Gestion de l'état :** L'état du formulaire est entièrement géré par **`react-hook-form`** pour des performances optimales (via les composants non contrôlés) et une API robuste. Le hook **`useFormContext`** est utilisé pour fournir le contexte du formulaire aux composants enfants sans avoir à "prop-driller" les méthodes `register`, `control`, etc.

-   **Composants :** L'interface est décomposée en composants fonctionnels et modulaires (ex: `Header`, `ActionsList`, `GameSelector`), chacun responsable d'une section de la maquette. Cette approche facilite la maintenance et la lisibilité du code.

-   **Validation :** La validation des données est assurée par **`zod`** via le `@hookform/resolvers/zod`. Cette librairie permet de définir des schémas de données complexes et d'inférer automatiquement les types TypeScript, garantissant une cohérence parfaite entre la validation et les types de l'application. Des règles complexes (ex: la validation croisée pour le mode "100% Gagnant") sont implémentées avec la méthode `superRefine` de `zod`.

-   **Styling :** Le style est géré par **Material-UI**. L'approche "responsive" a été implémentée en utilisant la **prop `sx`**, qui permet de définir des styles conditionnels en fonction des points de rupture du thème (breakpoints).

---

## 🛠️ Installation et Lancement

Pour lancer le projet en local, suivez ces étapes :

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/sim-david/frontend-challenge.git
    cd nom-du-dossier
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```

3.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    ```

L'application sera alors accessible à l'adresse `http://localhost:5173`.

### Scripts Disponibles

-   `npm run dev` : Lance l'application en mode développement.

---

**Auteur : https://github.com/Dendeey**
