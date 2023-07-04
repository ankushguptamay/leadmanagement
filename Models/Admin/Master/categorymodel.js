module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING
        },
        categoryCode: {
            type: DataTypes.STRING
        },
        categoryThumbnail:{
            type: DataTypes.STRING
        }
    })
    return Category;
}