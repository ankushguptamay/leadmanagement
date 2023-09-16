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
        categoryThumbnail_Name:{
            type: DataTypes.STRING(1234)
        },
        categoryThumbnail_FileName:{
            type: DataTypes.STRING(1234)
        },
        categoryThumbnail_Path:{
            type: DataTypes.STRING(1234)
        }
    })
    return Category;
}