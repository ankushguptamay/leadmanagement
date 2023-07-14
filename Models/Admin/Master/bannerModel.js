module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define("banner", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        bannerImage: {
            type: DataTypes.TEXT
        },
        bannerCode: {
            type: DataTypes.STRING
        }
    })
    return Banner;
}