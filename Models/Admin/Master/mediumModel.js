module.exports = (sequelize, DataTypes) => {
    const Medium = sequelize.define("medium", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        medium: {
            type: DataTypes.STRING
        },
        mediumCode: {
            type: DataTypes.STRING
        }
    })
    return Medium;
}