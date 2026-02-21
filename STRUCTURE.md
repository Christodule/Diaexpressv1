# Structure du projet DIAEXPRESS

## Pages disponibles

### Page d'accueil (Public)
- **URL**: `/`
- **Description**: Landing page avec présentation des services, formulaire de tracking, témoignages et contact

### Tableau de bord client (Authentifié)
- **URL**: `/dashboard`
- **Description**: Vue d'ensemble des activités du client avec statistiques, expéditions récentes et devis

### Demande de devis
- **URL**: `/quote-request`
- **Description**: Formulaire complet pour demander un devis d'expédition

### Liste des devis
- **URL**: `/quotes`
- **Description**: Gestion de tous les devis avec filtres et statuts

### Liste des expéditions
- **URL**: `/shipments`
- **Description**: Vue de toutes les expéditions avec progression en temps réel

### Nouvelle expédition
- **URL**: `/new-shipment/:quoteId`
- **Description**: Création d'une expédition à partir d'un devis approuvé

### Suivi de colis
- **URL**: `/track-shipment`
- **Description**: Suivi détaillé d'une expédition avec timeline des événements

### Livraisons
- **URL**: `/delivery`
- **Description**: Gestion et suivi des livraisons programmées et effectuées

### Mes colis
- **URL**: `/mes-colis`
- **Description**: Historique complet de tous les colis avec vue en grille

### Paiements
- **URL**: `/payments`
- **Description**: Gestion des factures et moyens de paiement

### Mon profil
- **URL**: `/client`
- **Description**: Gestion des informations personnelles et professionnelles

### Mes adresses
- **URL**: `/profile/addresses`
- **Description**: Gestion des adresses d'expédition et de livraison

### Réservation publique
- **URL**: `/public-dashboard/reservation`
- **Description**: Formulaire de réservation en 3 étapes pour visiteurs non authentifiés

### Page 404
- **URL**: `*` (toutes les URLs non définies)
- **Description**: Page d'erreur élégante avec navigation

## Architecture des composants

### Layouts
- `DashboardLayout`: Layout principal avec sidebar et navigation

## Backend Express (server.js)

Le backend est monte dans `server.js` avec les modules:

- `/api/v1/auth`
- `/api/v1/users`
- `/api/v1/quotes`
- `/api/v1/shipments`
- `/api/v1/bookings`
- `/api/v1/tracking`
- `/api/v1/pricing`
- `/api/v1/package-types`
- `/api/v1/expeditions`
- `/api/v1/admin-quotes`
- `/api/v1/market-points`
- `/api/v1/payments`
- `/api/v1/addresses`
- `/api/v1/reservations`
- `/api/v1/schedules`
- `/api/v1/uploads`

### Administration

- `/api/v1/admin` (v1/v2)
- `/api/admin` (legacy)
- `/api/v1/public` (endpoints publics client: health, quote-request, reservation, pricing-estimate, tracking)

### Components réutilisables
- `Header`: En-tête de la landing page
- `Hero`: Section hero avec image de fond
- `TrackingSection`: Section de suivi de colis
- `ServicesIcons`: Affichage des services avec icônes
- `AboutSection`: Section à propos
- `ServicesSection`: Détails des services
- `WhyChooseUs`: Avantages et raisons de choisir DIAEXPRESS
- `Testimonials`: Témoignages clients
- `ContactSection`: Formulaire de contact
- `Footer`: Pied de page

## Fonctionnalités principales

### Gestion des devis
- Demande de devis avec formulaire détaillé
- Liste et filtrage des devis
- Conversion de devis en expédition

### Suivi des expéditions
- Tracking en temps réel
- Timeline des événements
- Progression visuelle

### Gestion des livraisons
- Planification des livraisons
- Preuve de livraison
- Notifications

### Paiements
- Gestion des factures
- Multiples moyens de paiement
- Historique des transactions

### Profil utilisateur
- Informations personnelles
- Informations entreprise
- Sécurité du compte
- Gestion des adresses

## Technologies utilisées

- **React**: Bibliothèque UI
- **React Router**: Navigation et routing
- **Tailwind CSS**: Styling
- **Lucide React**: Icônes
- **TypeScript**: Typage statique

## Code couleurs

- **Principal**: `#f1580c` (Orange)
- **Secondaire**: `#6fccd4` (Cyan)
- **Accent**: `#FFB629` (Jaune)
- **Background**: `#f4fee8` (Vert clair)
- **Texte**: `#1a1a2e` (Bleu foncé)

## Navigation

La navigation est gérée par React Router avec:
- Routes publiques (/, /public-dashboard/reservation)
- Routes protégées (toutes les routes /dashboard/*)
- Layout partagé pour les routes authentifiées
- Page 404 pour les routes non définies
