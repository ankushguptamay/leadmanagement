module.exports = (sequelize, DataTypes) => {
    const AppUser = sequelize.define("appUser", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
    return AppUser;
}