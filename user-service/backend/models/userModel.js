module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    })

    return Users;
}