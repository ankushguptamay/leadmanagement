module.exports = (sequelize, DataTypes) => {
    const Lead_To_User = sequelize.define("lead_To_User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        assignerCode: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        paranoid: true
    })
    return Lead_To_User;
}