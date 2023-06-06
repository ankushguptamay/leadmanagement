module.exports = (sequelize, DataTypes) => {
    const Lead_To_User = sequelize.define("lead_to_user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userInformationId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leadProfileId:{
            type:DataTypes.STRING,
            allowNull: false
        },
        assignerId: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    return Lead_To_User;
}