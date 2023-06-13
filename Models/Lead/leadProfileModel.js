module.exports = (sequelize, DataTypes) => {
    const LeadProfile = sequelize.define("leadProfile", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
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
        assigned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        leadCode: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        createrCode: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        updaterCode: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    }, {
        paranoid: true
    })
    return LeadProfile;
}