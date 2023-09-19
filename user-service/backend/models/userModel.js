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
        firstName: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNULL: false,
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
        summary: {
            type: DataTypes.STRING,
        },
        education: {
            type: DataTypes.STRING,
        },
        work: {
            type: DataTypes.STRING,
        },
        github: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },
    })

    return Users;
}