module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
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
        isAdmin: {
            type: DataTypes.BOOLEAN,
        }
    })

    return Users;
}