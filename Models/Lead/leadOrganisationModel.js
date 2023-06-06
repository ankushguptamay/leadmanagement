module.exports = (sequelize, DataTypes) => {
    const LeadOrganisationInformation = sequelize.define("leadOrganisationInformation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        organisation: {
            type: DataTypes.STRING
        },
        annualRevenue: {
            type: DataTypes.STRING
        },
        territary: {
            type: DataTypes.STRING
        },
        numberOfEmployees: {
            type: DataTypes.STRING
        },
        industry: {
            type: DataTypes.STRING
        },
        marketSegment: {
            type: DataTypes.STRING
        },
        createrId: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
    return LeadOrganisationInformation;
}