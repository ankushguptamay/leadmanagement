module.exports = (sequelize, DataTypes) => {
    const EmployeesInformation = sequelize.define("employeesInformation", {
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
        employeesCode: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        },
        profile_position: {
            type: DataTypes.STRING
        }
    }, {
        paranoid:true
    })
    return EmployeesInformation;
}