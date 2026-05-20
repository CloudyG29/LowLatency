# SkillBridge — Technical Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Summary](#2-tech-stack-summary)
3. [Architecture Overview](#3-architecture-overview)
4. [Frontend](#4-frontend)
5. [Backend (Node.js / Express)](#5-backend-nodejs--express)
6. [Database Layer (Prisma + Azure SQL)](#6-database-layer-prisma--azure-sql)
7. [Authentication (Firebase)](#7-authentication-firebase)
8. [File Storage (Supabase)](#8-file-storage-supabase)
9. [Email Notifications (Nodemailer)](#9-email-notifications-nodemailer)
10. [In-App Notifications (Firestore + Cron)](#10-in-app-notifications-firestore--cron)
11. [SAQA Integration](#11-saqa-integration)
12. [Data Models](#12-data-models)
13. [API Routes Reference](#13-api-routes-reference)
14. [Environment Variables](#14-environment-variables)
15. [CI/CD Pipeline](#15-cicd-pipeline)

---

## 1. Project Overview

SkillBridge is a web-based platform that connects **applicants** (job seekers) with **providers** (organisations offering learnerships, internships, and opportunities). An **admin** role oversees the platform, approves listings, and handles reports.

The three user roles are:

| Role | Description |
|---|---|
| **Applicant** | Browses and applies for listings, uploads a CV, tracks application status |
| **Provider** | Creates and manages opportunity listings, reviews incoming applications |
| **Admin** | Approves or rejects listings, manages users, reviews reports |

---

## 2. Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database ORM | Prisma (with `@prisma/adapter-mssql`) |
| Database | Azure SQL Server (Microsoft SQL Server) |
| Authentication | Firebase Authentication |
| Real-time / Notifications DB | Firebase Firestore |
| File Storage | Supabase Storage |
| Email | Nodemailer (via Gmail SMTP) |
| Scheduled Jobs | node-cron |
| Qualification Data | SAQA scraper (axios + cheerio) |
| Testing | Jest |
| CI/CD | GitHub Actions → Microsoft Azure App Service |

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│           Vanilla HTML / CSS / JavaScript               │
│  (roles_htmls, views, assets, roles_css, roles_js)      │
└────────────────────────┬────────────────────────────────┘
                         │  HTTP / REST API
┌────────────────────────▼────────────────────────────────┐
│                  EXPRESS SERVER (index.js)               │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  /user   │ │/listings │ │/profile  │ │/dashboard │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────────┐ │
│  │ /reports │ │ /admin   │ │  /qualifications         │ │
│  └──────────┘ └──────────┘ └──────────────────────────┘ │
└───┬──────────────┬────────────────┬──────────────────────┘
    │              │                │
┌───▼────┐  ┌──────▼──────┐  ┌─────▼──────────────────┐
│ Prisma │  │  Firebase   │  │  Supabase Storage       │
│  ORM   │  │ Auth +      │  │  (CV file uploads)      │
└───┬────┘  │ Firestore   │  └────────────────────────-┘
    │       └─────────────┘
┌───▼────────────┐   ┌──────────────────┐
│ Azure SQL DB   │   │  Gmail SMTP      │
│ (SQL Server)   │   │  (Nodemailer)    │
└────────────────┘   └──────────────────┘
```

All services run behind a single Express server. The frontend is served as static files from the same process.

---

## 4. Frontend

**Location:** `/frontend`

The frontend is built with plain HTML, CSS, and JavaScript — no frontend framework is used. Files are organised by role:

```
/frontend
├── /assets          # Images and static media
├── /public          # Publicly served files
├── /roles_css       # CSS files scoped to each role
├── /roles_htmls     # Dashboard and role-specific pages
│   ├── applicant_view.html
│   ├── provider_view.html
│   ├── admin_view.html
│   └── dashboard.html
├── /roles_js        # JavaScript scoped to each role
├── /views           # Shared pages (login, signup, landing, etc.)
│   ├── landing.html
│   ├── login.html
│   ├── signup-applicant.html
│   ├── signup-provider.html
│   ├── signup-admin.html
│   ├── opportunity_detail.html
│   └── report_detail.html
├── index.html       # Main hub page
├── script.js        # Global JavaScript
└── style.css        # Global styles
```

**How it connects to the backend:**

The Express server in `index.js` serves all HTML files directly via `res.sendFile(...)` for named routes (e.g. `GET /login` → `login.html`). The `frontend/` folder is also mounted as static middleware so CSS, JS, and assets resolve automatically.

The role-specific JS files call the backend REST API using `fetch()` to load data and perform actions.

---

## 5. Backend (Node.js / Express)

**Location:** `/backend`  
**Entry point:** `backend/index.js`

The backend is a standard Express.js application. It handles all API logic, serves the frontend, and coordinates between the database, Firebase, Supabase, and email services.

### Server Setup (`index.js`)

```
Middleware applied (in order):
  1. express.static  → serves /frontend as static files
  2. cors()          → allows cross-origin requests
  3. express.json()  → parses JSON request bodies
  4. COOP header     → sets Cross-Origin-Opener-Policy for Firebase popup auth
```

### Route Structure

| Mount Path | File | Purpose |
|---|---|---|
| `/api/user` | `routes/user.js` | Registration, login, user management |
| `/api/admin` | `routes/get_user.js` | Admin user queries |
| `/api/listings` | `routes/listings.js` | Create, read, update listings |
| `/api/qualifications` | `routes/qualifications.js` | Qualification search and lookup |
| `/api/profile` | `routes/profile.js` | Applicant and provider profile management |
| `/api/dashboard` | `routes/dashboard.js` | Dashboard data (stats, summaries) |
| `/api/reports` | `routes/reports.js` | Submit and review listing reports |
| `/api/savedListings` | `routes/savedListings.js` | Save/unsave listings for applicants |

### Page Routes

The server also responds to browser navigation routes and serves the correct HTML file for each:

| URL | Served File |
|---|---|
| `/` | `views/landing.html` |
| `/login` | `views/login.html` |
| `/signup-applicant` | `views/signup-applicant.html` |
| `/applicant` | `roles_htmls/applicant_view.html` |
| `/provider` | `roles_htmls/provider_view.html` |
| `/admin` | `roles_htmls/admin_view.html` |
| `/dashboard` | `roles_htmls/dashboard.html` |
| `/opportunity/:id` | `views/opportunity_detail.html` |

### Module Pattern

The server exports `app` separately from the `listen()` call, allowing Jest to import the app without starting the server:

```js
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => { ... });
}
```

---

## 6. Database Layer (Prisma + Azure SQL)

**Schema location:** `/prisma/schema.prisma`  
**Prisma client location:** `/generated/` (auto-generated, not committed)  
**Connection utility:** `/DB_connect/prisma.js`

### How Prisma is Configured

SkillBridge uses Prisma with the **Microsoft SQL Server driver adapter** (`@prisma/adapter-mssql`) to connect to an Azure SQL database. The adapter is initialised in `DB_connect/prisma.js`:

```js
const { PrismaClient } = require('../generated/client');
const { PrismaMssql } = require('@prisma/adapter-mssql');

const adapter = new PrismaMssql(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
```

This single `prisma` instance is imported throughout the backend wherever database access is needed:

```js
const prisma = require('../../DB_connect/prisma');
```

### Key Prisma Commands

| Command | What it does |
|---|---|
| `npx prisma generate` | Generates the Prisma Client from `schema.prisma` into `/generated/` |
| `npx prisma db push` | Syncs the schema to the Azure SQL database without creating migration files |
| `npx prisma studio` | Opens a visual database browser at `localhost:5555` |

### Database Seeding

Qualification and skill data is seeded from SAQA using the script at `/backend/scripts/seed-qualifications.js`. See [Section 11](#11-saqa-integration) for how the scraping works.

```bash
node backend/scripts/seed-qualifications.js
```

---

## 7. Authentication (Firebase)

**File:** `backend/firebaseAdmin.js`

Firebase Authentication handles all user identity — sign-up, login, and session management. The backend uses the **Firebase Admin SDK** to verify tokens and interact with Firestore.

### Initialisation Strategy

The `firebaseAdmin.js` file has three initialisation paths to support all environments cleanly:

```
1. Jest (JEST_WORKER_ID is set)
   └─ Returns a mock `db` object so tests don't hit real Firebase

2. Production (Azure App Service)
   └─ Reads FIREBASE_SERVICE_ACCOUNT env variable (JSON string)
   └─ Parses it and initialises the Admin SDK

3. Local Development
   └─ Falls back to reading serviceAccountKey.json from disk
   └─ (This file is in .gitignore — never committed)
```

### How Authentication Works (end to end)

1. The user signs in or registers via Firebase Auth on the **frontend** (email/password or Google popup).
2. Firebase returns a JWT **ID token** to the browser.
3. The frontend sends this token in the `Authorization` header on API requests.
4. The **backend** verifies the token using `admin.auth().verifyIdToken(token)`.
5. The `firebase_uid` from the verified token is used to look up or create the corresponding `User` record in Azure SQL.

### Firestore (Notifications)

In addition to authentication, Firebase Firestore is used to store **real-time in-app notifications**. See [Section 10](#10-in-app-notifications-firestore--cron) for details.

---

## 8. File Storage (Supabase)

**File:** `backend/services/storage_service.js`

Applicant CVs are stored in **Supabase Storage** in a bucket called `cvs`. Supabase was chosen for its simple file storage API and signed URL support.

### How CV Uploads Work

1. The applicant submits an application with a CV file attached.
2. The backend receives the file buffer and calls `uploadCV()`.
3. The file is stored at the path `user_{userId}/application_{applicationId}.pdf`.
4. The `cvFilePath` is saved in the `Application` record in Azure SQL.

### Service Functions

| Function | Description |
|---|---|
| `uploadCV(buffer, mimetype, userId, applicationId)` | Uploads the CV to Supabase; overwrites if re-uploaded (`upsert: true`) |
| `getCVUrl(filePath)` | Generates a signed URL valid for 1 hour for secure, time-limited access |
| `deleteCV(filePath)` | Removes a CV from the bucket |

### File Path Convention

```
cvs/
└── user_42/
    └── application_107.pdf
```

---

## 9. Email Notifications (Nodemailer)

**File:** `backend/emailService.js`

When an application status changes (e.g. accepted, rejected), the applicant receives an automated email via **Nodemailer** using a Gmail SMTP account.

### How It Works

A `nodemailer` transporter is created once using credentials from environment variables:

```
EMAIL_USER  →  Gmail address used as the sender
EMAIL_PASS  →  Gmail App Password (not the account password)
```

The `sendStatusEmail(userEmail, userName, listingName, status)` function is called by the relevant route handler after a status update is saved to the database. The email is HTML-formatted with the applicant's name, the listing name, and the new status.

---

## 10. In-App Notifications (Firestore + Cron)

**File:** `backend/notifications.js`

In addition to email, applicants receive **in-app closing date reminders** pushed to Firestore. These are displayed on the frontend by listening to the user's Firestore notification collection.

### How the Cron Job Works

A `node-cron` job runs **every day at 08:00 AM** server time:

```
Schedule: '0 8 * * *'
```

Each run:

1. Calculates the date 3 days from today.
2. Queries Azure SQL (via Prisma) for all `SavedListing` records where the linked `Listing.closing_date` equals that date.
3. For each match, calls `sendFirebaseNotification()` to push a document to Firestore:

```
Collection: notifications
Document fields:
  userId    → Firebase UID of the applicant
  message   → "Reminder: {listingName} closes in 3 days!"
  type      → "Closing Reminder"
  isRead    → false
  createdAt → server timestamp
```

The frontend reads unread notifications from Firestore in real time using the Firebase client SDK.

---

## 11. SAQA Integration

**Files:**  
- `backend/services/saqa_service.js` — scraper  
- `backend/scripts/seed-qualifications.js` — seeder

SkillBridge populates its `Qualification` and `Skill` tables with official South African data scraped from the **South African Qualifications Authority (SAQA)** public search portal at `allqs.saqa.org.za`.

### How the Scraper Works (`saqa_service.js`)

The scraper uses **axios** to POST search requests to the SAQA search endpoint and **cheerio** to parse the returned HTML tables. It handles pagination automatically by tracking `start` offset against the total result count.

Key behaviours:
- Fetches in pages of 20 results (`PAGE_SIZE = 20`)
- Waits 1 second between requests (`DELAY_MS = 1000`) to avoid rate limiting
- Retries up to 3 times on failure with exponential backoff
- Scrapes two data types separately: **qualifications** (`cat=qual`) and **unit standards / skills** (`cat=unitstd`)

Each qualification record contains: `saqa_id`, `name`, `nqf_level`, `sector`, `originator`.  
Each skill record contains: `saqa_id`, `name`, `nqf_level`, `sector`.

### How the Seeder Works (`seed-qualifications.js`)

The seeder script scrapes all data first, then connects to the database and uses Prisma's `upsert` to insert or update each record, keyed on `saqa_id`. This means it is **safe to re-run** — it will update existing records rather than create duplicates.

```bash
# Run from the project root
node backend/scripts/seed-qualifications.js
```

> **Note:** This script is a one-time or periodic data refresh operation, not part of the regular application startup.

---

## 12. Data Models

All models are defined in `/prisma/schema.prisma` and map to tables in Azure SQL.

### Entity Relationship Summary

```
User ─────────────┬── ApplicantProfile ──┬── ApplicantSkill ──── Skill
                  │                      └── ApplicantQualification ── Qualification
                  ├── Provider ───────────── Listing ──┬── Application
                  │                                    ├── Report
                  └── Application                      └── SavedListing
```

### Models

**User**  
The central identity record. Created after Firebase authentication. Holds `firebase_uid` for linking back to Firebase Auth.

| Field | Type | Notes |
|---|---|---|
| `user_id` | Int (PK) | Auto-incremented |
| `name` | String | |
| `surname` | String | |
| `role` | String | `"applicant"`, `"provider"`, or `"admin"` |
| `email` | String | Unique |
| `firebase_uid` | String | Unique; links to Firebase Auth |

---

**ApplicantProfile**  
Extended profile for applicant users. One-to-one with `User`.

| Field | Type | Notes |
|---|---|---|
| `applicant_id` | Int (PK) | |
| `user_id` | Int (FK → User) | Unique |
| `phone` | String? | Optional |
| `dob` | DateTime? | Optional |
| `bio` | String? | Optional |

---

**Provider**  
Organisation profile for provider users. One-to-one with `User`.

| Field | Type | Notes |
|---|---|---|
| `provider_id` | Int (PK) | |
| `provider_name` | String | Organisation name |
| `profile` | String? | Description |
| `user_id` | Int (FK → User) | Unique |
| `onboarded` | Boolean | `false` until onboarding form is completed |

---

**Listing**  
An opportunity (learnership, internship, etc.) posted by a Provider.

| Field | Type | Notes |
|---|---|---|
| `listings_id` | Int (PK) | |
| `listname` | String | Title of the opportunity |
| `list_type` | String | e.g. `"Learnership"`, `"Internship"` |
| `nqf_level` | Int? | NQF level required |
| `status` | String | `"pending"`, `"approved"`, `"rejected"` |
| `closing_date` | DateTime? | Used by the notification cron job |
| `provider_id` | Int (FK → Provider) | |

---

**Application**  
A submission by an applicant for a specific listing.

| Field | Type | Notes |
|---|---|---|
| `application_id` | Int (PK) | |
| `user_id` | Int (FK → User, Cascade delete) | |
| `provider_id` | Int (FK → Provider) | |
| `listing_id` | Int (FK → Listing) | |
| `status` | String | `"pending"`, `"accepted"`, `"rejected"` |
| `cvFilePath` | String? | Supabase Storage path |
| `motivation` | String? | Applicant's motivation letter text |

---

**Qualification** and **Skill**  
Populated from the SAQA scraper. Applicants link to these via `ApplicantQualification` and `ApplicantSkill` junction tables.

---

**SavedListing**  
Tracks which listings an applicant has bookmarked. The composite unique constraint `[userId, listingId]` prevents duplicate saves.

---

**Report**  
Allows users to flag a listing for admin review.

| Field | Type | Notes |
|---|---|---|
| `report_id` | Int (PK) | |
| `listing_id` | Int (FK → Listing) | |
| `reason` | String | Category of the report |
| `reported_by` | String | Firebase UID of the reporter |
| `status` | String | `"pending"`, `"resolved"` |

---

## 13. API Routes Reference

All endpoints are prefixed with `/api/`.

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/user/register` | Register a new user after Firebase sign-up |
| `GET` | `/api/user/:uid` | Get user data by Firebase UID |
| `GET` | `/api/listings` | Get all approved listings |
| `POST` | `/api/listings` | Create a new listing (provider) |
| `PATCH` | `/api/listings/:id` | Update a listing's status (admin) |
| `GET` | `/api/profile/:uid` | Get a user's full profile |
| `PUT` | `/api/profile/:uid` | Update profile details |
| `GET` | `/api/dashboard` | Aggregated stats for the logged-in user |
| `GET` | `/api/qualifications` | Search qualifications by name/NQF level |
| `POST` | `/api/savedListings` | Save a listing for an applicant |
| `DELETE` | `/api/savedListings/:id` | Remove a saved listing |
| `POST` | `/api/reports` | Submit a report on a listing |
| `GET` | `/api/reports` | Get all reports (admin) |
| `GET` | `/api/admin/users` | Get all users (admin) |

---

## 14. Environment Variables

All environment variables are stored in a `.env` file inside `/backend/`. This file is in `.gitignore` and must never be committed.

| Variable | Used In | Description |
|---|---|---|
| `DATABASE_URL` | `DB_connect/prisma.js` | Azure SQL Server connection string |
| `EMAIL_USER` | `emailService.js` | Gmail address for sending emails |
| `EMAIL_PASS` | `emailService.js` | Gmail App Password |
| `FIREBASE_SERVICE_ACCOUNT` | `firebaseAdmin.js` | Full Firebase service account JSON (production) |
| `SUPABASE_SERVICE_ROLE_KEY` | `storage_service.js` | Supabase service role key for storage access |
| `PORT` | `index.js` | Server port (defaults to `3000`) |

### Example `.env`

```text
DATABASE_URL="sqlserver://lowlatency.database.windows.net:1433;database=SkillBridge;user=YOUR_USER;password=YOUR_PASS;encrypt=true;trustServerCertificate=false"
EMAIL_USER="skillbridge.notifications@gmail.com"
EMAIL_PASS="your-gmail-app-password"
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
PORT=3000
```

> **For local dev:** Instead of `FIREBASE_SERVICE_ACCOUNT`, you can place `serviceAccountKey.json` inside `/backend/`. The `firebaseAdmin.js` file will fall back to reading it from disk automatically.

---

## 15. CI/CD Pipeline

**Location:** `.github/workflows/`

The repository uses **GitHub Actions** to automate testing and deployment to **Microsoft Azure App Service**.

### Pipeline Flow

```
Pull Request merged into main
         │
         ▼
  GitHub Actions triggered
         │
         ▼
  npm install (all dependencies)
         │
         ▼
  Run Jest test suite (npm run test)
         │
    ┌────┴────┐
  FAIL       PASS
    │          │
    ▼          ▼
 ❌ Block    ✅ Build & package app
 deploy           │
                  ▼
         Deploy to Azure App Service
                  │
                  ▼
         🚀 Live environment updated
```

### Workflow Files

| File | Purpose |
|---|---|
| `main_skillbridge.yml` | Main deployment workflow — runs tests then deploys to Azure |
| `node.js.yml` | Node.js CI workflow — runs on all PRs to verify tests pass before merge is allowed |

### Test Environment in CI

The Jest worker environment sets `JEST_WORKER_ID`, which `firebaseAdmin.js` detects to skip real Firebase initialisation and return a mock `db` object instead. This means the CI pipeline does not require Firebase credentials to run tests successfully.