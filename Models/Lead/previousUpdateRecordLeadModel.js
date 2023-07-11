module.exports = (sequelize, DataTypes) => {
    const PreviousUpdateRecordLead = sequelize.define("previousUpdateRecordLead", {
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
            type: DataTypes.STRING
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
        selectedDisease: {
            type: DataTypes.JSON
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
        createrCode: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        updaterCode: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        assigned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    return PreviousUpdateRecordLead;
}