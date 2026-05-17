# Objectif Mention Monastir

Application Next.js 16 (App Router) pour la vente et la distribution de
documents pédagogiques (Physique, Chimie) aux élèves du secondaire tunisien,
avec livraison à Monastir et ses environs et paiement à la livraison.

## Fonctionnalités

- **Visiteurs** (aucun compte requis) : parcourent le catalogue, filtrent par
  matière (Physique, Chimie), niveau (1ère, 2ème, 3ème, Baccalauréat) ou
  section, ajoutent au panier et commandent via le formulaire `/commander`
  (nom, téléphone obligatoire, email facultatif, ville + adresse).
- **Admin** (`/admin/login`) : tableau de bord, ajout / édition / suppression
  des documents (PDF, Word, ou photo de couverture pour documents papier avec
  stock), gestion des commandes (statuts : en attente, confirmée, livrée,
  annulée).
- Documents numériques (PDF/Word) sans limite de copies, documents papier
  avec décrément automatique du stock à la commande (et restauration en cas
  d'annulation).

## Stack

- Next.js 16 (App Router, Server Actions, Turbopack)
- React 19
- Tailwind CSS v4 (thème blanc & violet)
- Prisma 6 + **PostgreSQL** (Neon / Vercel Postgres / Supabase)
- **Vercel Blob** pour le stockage des PDF / Word / images
- Zod (validation)
- jose (sessions admin signées par JWT)

## Démarrage local

Il faut une base PostgreSQL accessible (locale via Docker, ou un projet Neon /
Vercel Postgres gratuit).

```powershell
npm install
# Renseigner .env :
#   DATABASE_URL="postgresql://..."
#   BLOB_READ_WRITE_TOKEN="..."         (Vercel > Storage > Blob)
#   ADMIN_USERNAME / ADMIN_PASSWORD / AUTH_SECRET

npx prisma migrate dev --name init       # crée les tables
npm run dev                              # http://localhost:3000
```

## Déploiement sur Vercel

1. **Push** le repo sur GitHub / GitLab.
2. Sur <https://vercel.com> → **Add New Project** → importer le repo.
   Framework : Next.js (détecté). Root directory :
   `objectif-mention-monastir`.
3. **Storage** (onglet du projet) :
   - **Postgres** → *Create database* (Neon en sous-jacent, gratuit).
     Vercel ajoute automatiquement `DATABASE_URL`, `POSTGRES_URL`, etc.
     dans les variables d'environnement.
   - **Blob** → *Create store*. Vercel ajoute `BLOB_READ_WRITE_TOKEN`.
4. **Environment Variables** → ajouter manuellement :
   - `ADMIN_USERNAME` = `admin` (ou autre)
   - `ADMIN_PASSWORD` = un mot de passe fort
   - `AUTH_SECRET` = chaîne aléatoire ≥ 32 caractères
     (générer : `openssl rand -base64 48`)
5. **Deploy**. Le script `build` lance automatiquement
   `prisma generate && prisma migrate deploy && next build`, donc les
   migrations sont appliquées à chaque déploiement.
6. Aller sur `https://<votre-app>.vercel.app/admin/login` pour vous
   connecter.

### Régénérer les migrations

Si vous modifiez `prisma/schema.prisma`, lancez en local :

```powershell
npx prisma migrate dev --name <nom_du_changement>
```

Commitez le dossier `prisma/migrations/` créé. Vercel appliquera la
migration au prochain déploiement (`prisma migrate deploy`).

## Identifiants admin par défaut

- URL : <http://localhost:3000/admin/login>
- Identifiant : `admin`
- Mot de passe : `admin123`

> À changer impérativement en production dans `.env` (`ADMIN_USERNAME`,
> `ADMIN_PASSWORD`, et un `AUTH_SECRET` aléatoire d'au moins 32 caractères).

## Structure

```
app/
  page.tsx                       # Accueil
  documents/                     # Catalogue + détail
  commander/                     # Panier + formulaire de commande
  admin/                         # Espace admin protégé
    login/
    documents/                   # CRUD documents (upload PDF / Word / image)
    orders/                      # Gestion des commandes
components/                      # Cart context + composants UI partagés
lib/
  prisma.ts                      # Client Prisma singleton
  auth.ts                        # Session admin (JWT cookie)
  validation.ts                  # Schémas Zod
  upload.ts                      # Sauvegarde fichiers dans public/uploads
  constants.ts                   # Matières, niveaux, sections, villes
prisma/
  schema.prisma                  # Modèles Document / Order / OrderItem
public/uploads/                  # Fichiers téléversés (ignorés par git)
```

## Notes de production

- Les fichiers téléversés sont stockés sur **Vercel Blob** (CDN public).
  Aucun fichier n'est gardé sur le disque du serveur.
- La base est **PostgreSQL**. Pour passer à un autre provider
  (Supabase, RDS…), il suffit de changer `DATABASE_URL`.
- En production, le cookie de session admin est `Secure` (HTTPS requis,
  ce que Vercel fournit par défaut).
- Limite d'upload : 30 Mo par fichier (configurée dans
  [next.config.ts](next.config.ts) et appliquée côté serveur).
