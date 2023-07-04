module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define("language", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        language: {
            type: DataTypes.STRING
        },
        languageCode: {
            type: DataTypes.STRING
        }
    })
    return Language;
}