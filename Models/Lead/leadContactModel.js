module.exports = (sequelize, DataTypes) => {
    const LeadContactInformation = sequelize.define("leadContactInformation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        website: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        whatsAppNumber: {
            type: DataTypes.STRING
        },
        createrId: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    return LeadContactInformation;
}