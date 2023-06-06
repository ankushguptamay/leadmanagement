module.exports = (sequelize, DataTypes) => {
    const LeadProfile = sequelize.define("leadProfile", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        middleName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
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
        }
    })
    return LeadProfile;
}