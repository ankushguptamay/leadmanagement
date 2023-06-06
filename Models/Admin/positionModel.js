module.exports = (sequelize, DataTypes) => {
    const UserPosition = sequelize.define("userPosition", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userPosition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        positionCode:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return UserPosition;
}