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
            defaultValue: "Available"
        },
        priceForIndian: {
            type: DataTypes.STRING
        },
        priceForNonIndian: {
            type: DataTypes.STRING
        }
    })
    return AppointmentSlote;
}