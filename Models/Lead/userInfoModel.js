module.exports = (sequelize, DataTypes) => {
    const UserInformation = sequelize.define("userInformation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
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
            primaryKey: true,
            allowNull: false
        }
    }, {
        paranoid:true
    })
    return UserInformation;
}