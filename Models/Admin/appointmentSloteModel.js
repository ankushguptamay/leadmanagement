module.exports = (sequelize, DataTypes) => {
    const AppointmentSlote = sequelize.define("appointmentStole", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        }
    })
    return AppointmentSlote;
}