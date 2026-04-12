# SkillBridge Project
Welcome to the SkillBridge repository! This document outlines our project architecture, Git workflow, database setup, and deployment processes.

## Team Members
* **Mogomotsi Motoma(2898909)** - Mo06-exe
* **Nduvho Mulaudzi(2801257)** - CloudyG29
* **Kgaogelo Mohlala(2836959)** - Kgaogelo96
* **Moteku Tetelo(2679354)** - MotekuMagolo
* **Lethabo Sekgobela(2684887)** - Lethabo809

  ## Project Structure
  We are using the Monorepo structure to keep our web frontend and Node.js/Prisma backend cleanly separated.

```text
/skillbridge
│
├── /frontend               # HTML, CSS, and plain JavaScript files
├── /backend                # Node.js server, API routes, and Prisma
├── /tests                  # Jest Acceptance Tests (UATs)
├── .github/workflows       # Azure CI/CD configuration files
├── .gitignore              # Files to ignore (e.g., node_modules, .env)
└── README.md               # Project documentation
```
# Git Workflow & Contribution Rules
**CRITICAL:** The main branch is locked. **DO NOT push directly to main**. All code must go through a Pull Request (PR) and be approved by at least one member.

### Step 1: Start with the freashest code
Always pull the latest changes before adding a new feature or doing a chore
```text
git checkout main
git pull origin main
```
### Step 2: Create a new branch
Use the correct prefix for your task:
* feat/ for new user stories/features
* chore/ for setup/infrastructure
* fix/ for bug fixes
```text
git checkout -b <prefix>/<your-branch-name>
```

### Step 3: Write code, save, and commit
Write clear commit messages
```text
git add .
git commit -m "feat/chore/fix: clear description of what you did"
```

### Step 4: Push to GitHub
```text
git push -u origin <prefix>/<your-branch-name>
```

### Step 5: Open a Pull Request (PR)
1. Go to GitHub and click "Compare & pull request"
2. Add at least one member as the Reviewer
3. Wait for approval. Once approved, click "Merge pull request"

# Database Setup (Prisma)
We are using Prisma ORM with a relational database. To run the backend locally, you must connect to the database.

1. Create your environment file:
   Navigate to into the /backend folder and create a .env file (**Note**: .env is in our .gitignore - **never commit your passwords to GitHub!**)
2. Add the Database URL:
   Paste the connection string provided into the .env file:
   ```text
   DATABASE_URL="sqlserver://lowlatency.database.windows.net:1433;database=SkillBridge=OUR_USERNAME;password=OUR_PASSWORD;encrypt=true;trustServerCertificate=false"
   ```
3. Generate the Prisma Client & Push Schema:
   Run the following commands **inside the /backend folder** to sync to your local setup with the database:
   ```text
   npm install
   npx prisma generate
   npx prisma db push
   ```

# CI/CD Pipeline
The repository is configured for automated deployment to MS Azure
* **Trigger:** The CI/CD pipeline is triggered automatically via GitHub Actions whenever a Pull Request is successfully merged into the main branch
* **Testing:** The pipeline will first run our Jest automated tests. If the test fail, the **deployment will block**.
* **Deployment:** If the tests pass, the updated code is automatically packaged and pushed to our live Azure App Service environment.

# Testing
To meet our TDD requirements, we use Jest fpr User Acceptance Tests (UATs) and Code Coverage.
To run the test suite locally before you open a Pull Request:
```text
npm run test
npm run test -- --coverage
```
