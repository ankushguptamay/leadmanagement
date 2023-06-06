module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define("userRole", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleCode:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return UserRole;
}