# SkillBridge Project
Welcome to the SkillBridge repository! This document outlines our project architecture, Git workflow, database setup, local run instructions, and deployment processes.

## Team Members
* **Mogomotsi Motoma (2898909)** - Mo06-exe
* **Nduvho Mulaudzi (2801257)** - CloudyG29
* **Kgaogelo Mohlala (2836959)** - Kgaogelo96
* **Moteku Tetelo (2679354)** - MotekuMagolo
* **Lethabo Sekgobela (2684887)** - Lethabo809

## Project Structure
We are using a monorepo structure to keep our modular components organized and manageable. Below is an expanded overview of the root directory and its internal layouts:

```text
/skillbridge
│
├── /frontend               # User interface files
│   ├── /roles_css          # Stylesheets (e.g., applicant_view.css, provider_view.css)
│   ├── /roles_views        # HTML documents (e.g., applicant_view.html, login.html)
│   └── /roles_js           # Frontend scripts (e.g., applicant_view.js, provider_view.js)
│
├── /backend                # Node.js server environment & business logic
│   ├── /routes             # Express API routers (e.g., listings.js, emailService.js)
│   ├── firebaseAdmin.js    # Firebase Admin SDK initialization configurations
│   ├── index.js            # Server bootstrapper and core Express app configuration
│   └── package.json        # Server-side module manifests and dependency mappings
│
├── /DB_connect             # Database and storage abstraction services
│   ├── prisma.js           # Shared centralized Prisma Client instantiation instance
│   └── storage_service.js  # File upload utility logic (e.g., uploadCV, getCVUrl)
│
├── /prisma                 # Schema definitions mapping database structure
│   └── schema.prisma       # Core declarative schema layout for Prisma models
│
├── /__tests__              # Jest automated unit and User Acceptance Tests (UATs)
│
├── .github/workflows       # CI/CD automation pipeline automation rules
│   └── azure-deploy.yml    # Automated testing and Azure deployment playbooks
│
├── .gitignore              # Tracking exclusions definition profile (keeps secrets safe)
└── README.md               # Unified project architectural manual
```

---

# Git Workflow & Contribution Rules
**CRITICAL:** The main branch is locked. **DO NOT push directly to main**. All code must go through a Pull Request (PR) and be approved by at least one team member.

### Step 1: Start with the freshest code
Always pull the latest changes before adding a new feature or doing a chore:
```bash
git checkout main
git pull origin main
```

### Step 2: Create a new branch
Use the correct prefix for your task:
* `feat/` for new user stories/features
* `chore/` for setup/infrastructure
* `fix/` for bug fixes
```bash
git checkout -b <prefix>/<your-branch-name>
```

### Step 3: Write code, save, and commit
Write clear, concise commit messages:
```bash
git add .
git commit -m "feat/chore/fix: clear description of what you did"
```

### Step 4: Push to GitHub
```bash
git push -u origin <prefix>/<your-branch-name>
```

### Step 5: Open a Pull Request (PR)
1. Go to GitHub and click "Compare & pull request"
2. Add at least one team member as a Reviewer
3. Wait for approval. Once approved, click "Merge pull request"

---

# Database Setup (Prisma)
We are using Prisma ORM with a relational database. To run the backend locally, you must connect to the database instance.

1. **Create your environment file:**
   Navigate into the `/backend` folder or project root (depending on your runner setup) and verify your `.env` file configuration (**Note**: `.env` is tracked in our `.gitignore`—**never commit your passwords to GitHub!**).
2. **Add the Database URL:**
   Paste the connection string provided into your local `.env` configuration:
   ```env
   DATABASE_URL="sqlserver://lowlatency.database.windows.net:1433;database=SkillBridge;user=OUR_USERNAME;password=OUR_PASSWORD;encrypt=true;trustServerCertificate=false"
   ```
3. **Generate the Prisma Client & Push Schema:**
   Run the following commands to synchronize your local application tier with the database specifications:
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   ```

---

# Running the Project Locally

Follow these step-by-step procedures to boot the server instance

### 1. Launching the Backend Engine
1. Install the necessary system dependencies listed in the package configuration:
   ```bash
   npm install
   ```

2. Generate the updated client mappings based on your local configurations:
   ```bash
   npx prisma generate
   ```

3. Boot up the application server in development reload execution mode:
   ```bash
   npm start
   ```

### 2. Lanching using node 
1. Install the necessary system dependencies listed in the package configuration:
   ```bash
   npm install
   ```

2. Generate the updated client mappings based on your local configurations:
   ```bash
   npx prisma generate
   ```

3. Navigate to the backend directory
   ```bash
   cd backend
   ```
4. Boot up the application server in development reload execution mode:
   ```bash
   node index.js
   ```
The runtime layer will default live listening points locally at 
   ```text
   http://localhost:3000
   ```
(or the fallback configuration explicitly selected inside your main server script).

# CI/CD Pipeline
The repository is configured for automated deployment to MS Azure.
* **Trigger:** The CI/CD pipeline is triggered automatically via GitHub Actions whenever a Pull Request is successfully merged into the `main` branch.
* **Testing:** The pipeline will first execute our comprehensive Jest automated verification scripts. If any validation step returns a fault, **the deployment sequence will be blocked automatically**.
* **Deployment:** If the verification scripts complete without issue, the structural additions are safely compiled, packed, and released into our live Azure App Service environment.

---

# Testing
To satisfy our development standards, we rely on Jest for managing our automated User Acceptance Tests (UATs) and monitoring code metrics.

To run the complete validation test suite locally before pushing or opening a Pull Request, run the following commands:
```bash
npm run test
npm run test -- --coverage
```