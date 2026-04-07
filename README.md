To run the project locally , you need to download the dependencies by
Just running the following command:
npm install
and the dependencies will be taken from package-lock.json and downloaded on your machine.
run this :
npx prisma generate
this generate a prisma client which connects you to the database

Now to connect to the database:
Create a '.env' file in the root of the project(under the lowlatency file directly)//NEVER push your .env file to git hub :)

Add the following line
DATABASE_URL="sqlserver://lowlatency.database.windows.net:1433;database=SkillBridge;user=CloudSA22f63f5f;password=LowLatency5;encrypt=true;trustServerCertificate=false"

when that is done , please run the test.js file (it only test for connection)
also make sure that your IP address is whitelisted in the azure portal
steps are as follows:1. Go to website
:2. navigate to the server (lowlatency)
:3. On the left search bar , search "networking"
:4. Scroll down and click "Add your client IPV4 adress" the save.
Then your IP will not be stopped at the firewall and you should edit the db
