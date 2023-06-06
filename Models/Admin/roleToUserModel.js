module.exports = (sequelize, DataTypes) => {
    const Role_To_User = sequelize.define("role_to_user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userInformationId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userRoleId:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return Role_To_User;
}