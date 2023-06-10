module.exports = (sequelize, DataTypes) => {
    const AppointmentSlote = sequelize.define("appointmentStole", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return AppointmentSlote;
}