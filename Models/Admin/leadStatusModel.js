module.exports = (sequelize, DataTypes) => {
    const LeadStatus = sequelize.define("leadStatus", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        leadStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leadStatusCode:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return LeadStatus;
}