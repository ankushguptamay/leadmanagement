module.exports = (sequelize, DataTypes) => {
    const LeadAddressInformation = sequelize.define("leadAddressInformation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        city: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        createrId: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    return LeadAddressInformation;
}