module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    })

    return Users;
}