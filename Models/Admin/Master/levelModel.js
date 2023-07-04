module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define("level", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        level: {
            type: DataTypes.STRING
        },
        levelCode: {
            type: DataTypes.STRING
        }
    })
    return Level;
}