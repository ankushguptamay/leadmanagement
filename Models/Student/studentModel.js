module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define("student", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    }, {
        paranoid: true
    })
    return student;
}