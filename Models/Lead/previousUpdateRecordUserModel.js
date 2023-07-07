module.exports = (sequelize, DataTypes) => {
    const PreviousUpdateRecordUser = sequelize.define("previousUpdateRecordUser", {
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
        updaterCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createrCode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return PreviousUpdateRecordUser;
}