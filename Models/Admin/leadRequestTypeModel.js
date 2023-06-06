module.exports = (sequelize, DataTypes) => {
    const LeadRequestType = sequelize.define("leadRequestType", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        requestType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requestTypeCode:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return LeadRequestType;
}