module.exports = (sequelize, DataTypes) => {
    const UserInformation = sequelize.define("userInformation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
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
        dateOfBirth: {
            type: DataTypes.DATE
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        language: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        inetrest: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        document: {
            type: DataTypes.JSON
        },
        role: {
            type: DataTypes.JSON,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return UserInformation;
}