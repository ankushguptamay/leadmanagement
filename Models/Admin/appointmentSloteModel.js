module.exports = (sequelize, DataTypes) => {
    const AppointmentSlote = sequelize.define("appointmentStole", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        time: {
            type: DataTypes.STRING
        },
        appointmentStatus: {
            type: DataTypes.STRING,
            defaultValue: "Active" // Deactivate 
        },
        bookingStatus: {
            type: DataTypes.STRING,
            defaultValue: "Available" // Available, Booked, Closed
        },
        priceForIndian: {
            type: DataTypes.STRING
        },
        priceForNonIndian: {
            type: DataTypes.STRING
        },
        patientName: {
            type: DataTypes.STRING
        },
        patientAge: {
            type: DataTypes.STRING
        },
        patientGender: {
            type: DataTypes.STRING
        },
        patientProblem: {
            type: DataTypes.TEXT
        },
        patientPhoneNumber: {
            type: DataTypes.STRING
        },
        appUserId: {
            type: DataTypes.STRING
        }

    })
    return AppointmentSlote;
}