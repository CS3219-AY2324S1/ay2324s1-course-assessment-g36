module.exports = (sequelize, DataTypes) => {
    const Histories = sequelize.define("Histories", {
        attemptId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNULL: false,
        },
        attempt: {
            type: DataTypes.TEXT,
            allowNULL: false
        },
        language: {
            type: DataTypes.STRING,
            allowNULL: false
        }
    })

    return Histories;
}