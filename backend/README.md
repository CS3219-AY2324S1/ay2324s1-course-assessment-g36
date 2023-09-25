# Getting started

## Running the project

1. Set up packages and dependencies with:

   ```
   npm install
   ```

2. If you have not set up MySQL and MongoDB previously, follow the following sections to set up the [Users](#setting-up-mysql-database) and [Questions](#connecting-to-mongodb) databases before running the project.

3. If this is your first time using PeerPrep and would like to populate your app with sample questions, run the following command:

   ```
   npm run seed
   ```

   Ensure that you only run this command **once** after setting up the Questions database. Otherwise, an error will be thrown.

4. Run the project with:

   ```
   npm start
   ```

## Setting up MySql

1. Ensure that you have downloaded [MySql](https://www.mysql.com/downloads/) on your device.
2. In your terminal, run the following command to connect to a MySql server and enter your password when prompted.

   ```
   mysql -u <username> -p
   ```

3. Create an empty Users database with the following command in the MySql server:

   ```
   CREATE DATABASE Users;
   ```

4. You can check that the database has been successfully created with the command:

   ```
   SHOW DATABASES;
   ```

### Setting up MongoDB Atlas

1. Sign in to or register an account with [MongoDB Atlas](https://www.mongodb.com/atlas/database).

2. Once logged in, create a new cluster by clicking in the 'Create' button in the 'Overview' tab.

3. Select the "free" configuration option before creating the cluster.

4. Copy the password generated to a text editor and click on "create user".

5. Click on "Finish and close" to create your database

6. Once your database has been successfully created, click on "Connect" > "MongoDB for VS Code", and copy the link provided.

7. In the `question-service` directory, create a `.env` file and enter the following link copied in step 6, replacing the `<password>` field with the one obtained in step 4.

   ```
   MONGODB_URI=<link>
   ```
