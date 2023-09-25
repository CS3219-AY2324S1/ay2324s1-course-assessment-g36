# Getting started

## Connecting to MongoDB

There are several ways to install MongoDB.

### Using MongoDB Atlas

1. Sign in to or register an account with [MongoDB Atlas](https://www.mongodb.com/atlas/database).

2. Once logged in, create a new cluster by clicking in the 'Create' button in the 'Overview' tab.

3. Select the "free" configuration option before creating the cluster.

4. Copy the password generated to a text editor and click on "create user".

5. Click on "Finish and close" to create your database

6. Once your database has been successfully created, click on "Connect" > "MongoDB for VS Code", and copy the link provided.

7. In this project folder, create a `.env` file.

8. In your `.env` file, enter the line include the link by entering following line, and replacing the `<password>` field in the link with the password copied in step 4.

   ```
   MONGODB_URI=<link>
   ```

## Running the project

1. Set up packages and dependencies with:

   ```
   npm install
   ```

2. If you have not set up the database previously, follow [this section](#setting-up-mysql-database) to set up the Questions database before running the project.

3. If this is your first time and would like to populate the page with sample questions, run:

   ```
   npm run seed
   ```

4. Start the project with:

   ```
   npm start
   ```
