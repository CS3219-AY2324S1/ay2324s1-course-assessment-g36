# Getting started

## Running the project

1. Set up packages and dependencies with:

   ```
   npm install
   ```

2. If you have not set up MongoDB previously, follow the following [section](#setting-up-mongodb-atlas) to set up the database before running the project.

3. If this is your first time using PeerPrep and would like to populate your app with sample questions, run the following command:

   ```
   npm run seed
   ```

   Ensure that you only run this command **once** after setting up the Questions database, or if the database is empty. Otherwise, an error might be thrown.

4. Run the project with:

   ```
   npm start
   ```

### Setting up MongoDB Atlas

1. Sign in to or register an account with [MongoDB Atlas](https://www.mongodb.com/atlas/database).

2. Once logged in, create a new cluster by clicking in the 'Create' button in the 'Overview' tab.

3. Select the "free" configuration option before creating the cluster.

4. Copy the password generated to a text editor and click on "create user".

5. Click on "Finish and close" to create your database

6. Once your database has been successfully created, click on "Connect" > "MongoDB for VS Code", and copy the link provided.

7. In the current `question-service` directory, create a `.env` file and enter the following link copied in step 6, replacing the `<password>` field with the one obtained in step 4.

   ```
   MONGODB_URI=<link>
   ```

## Configuration

The following environment variables can be used to configure the service:

- `MONGODB_URI`: URI of the MongoDB instance
- `JSON_WEB_TOKEN_SECRET`: Secret used to verify JWTs
- `PORT`: Port number to run service on (default: 3001)

They can be configured by creating a `.env` file as well (see `.env.local` for a copyable template).
