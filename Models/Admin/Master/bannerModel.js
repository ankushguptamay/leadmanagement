module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define("banner", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        banner_Path: {
            type: DataTypes.STRING(1234)
        },
        banner_Name: {
            type: DataTypes.STRING(1234)
        },
        banner_FileName: {
            type: DataTypes.STRING(1234)
        },
        bannerCode: {
            type: DataTypes.STRING
        }
    })
    return Banner;
}