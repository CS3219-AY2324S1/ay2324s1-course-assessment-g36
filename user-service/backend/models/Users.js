module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            unique: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    })

    return Users;
}