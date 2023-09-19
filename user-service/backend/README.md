# Getting started

## Setting up MySql database

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

## Running the project

1. Set up packages and dependencies with:

   ```
   npm install
   ```

2. If you have not set up the database previously, follow this section to set up the Users database before running the project.

3. Run the project with:

   ```
   npm start
   ```
