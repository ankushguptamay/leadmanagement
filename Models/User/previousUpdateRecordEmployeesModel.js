module.exports = (sequelize, DataTypes) => {
    const PreviousUpdateRecordEmployees = sequelize.define("previousUpdateRecordEmployees", {
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
        address: {
            type: DataTypes.STRING
        },
        profile_position: {
            type: DataTypes.STRING
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
    return PreviousUpdateRecordEmployees;
}