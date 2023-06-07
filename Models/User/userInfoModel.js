module.exports = (sequelize, DataTypes) => {
    const UserInformation = sequelize.define("userInformation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return UserInformation;
}