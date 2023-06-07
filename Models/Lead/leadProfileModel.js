module.exports = (sequelize, DataTypes) => {
    const LeadProfile = sequelize.define("leadProfile", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING
        },
        jobTitle: {
            type: DataTypes.STRING
        },
        salutation: {
            type: DataTypes.STRING
        },
        leadOwner: {
            type: DataTypes.STRING // creater name
        },
        source: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        leadType: {
            type: DataTypes.STRING
        },
        requestType: {
            type: DataTypes.STRING
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
        website: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        whatsAppNumber: {
            type: DataTypes.STRING
        },
        leadCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createrId: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    })
    return LeadProfile;
}