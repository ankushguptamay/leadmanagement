module.exports = (sequelize, DataTypes) => {
    const PatientAppointment = sequelize.define("patientAppointment", {
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
            allowNull: false
        },
        fullName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        age:{
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: false
        },
        patientProblem:{
            type: DataTypes.TEXT,
            allowNull: true
        }
        
    })
    return PatientAppointment;
}