const config = {
  "development": {
    "username": "root",
    "password": null,
    "database": "Users",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "Users",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "Users",
    "host": process.env.USER_DB_URI,
    "dialect": "mysql"
  }
}

module.exports = config;
