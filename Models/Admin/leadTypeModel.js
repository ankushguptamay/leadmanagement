module.exports = (sequelize, DataTypes) => {
    const LeadType = sequelize.define("leadType", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        leadType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leadTypeCode:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return LeadType;
}