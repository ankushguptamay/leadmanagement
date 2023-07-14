module.exports = (sequelize, DataTypes) => {
    const Disease = sequelize.define("disease", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        disease: {
            type: DataTypes.STRING
        },
        diseaseCode: {
            type: DataTypes.STRING
        }
    })
    return Disease;
}