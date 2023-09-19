module.exports = (sequelize, DataTypes) => {
    const AppUser = sequelize.define("appUser", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        profileImage_Path: { 
            type: DataTypes.STRING(1234)
        },
        profileImage_Name: { 
            type: DataTypes.STRING(1234)
        },
        profileImage_FileName: { 
            type: DataTypes.STRING(1234)
        }
    }, {
        paranoid: true
    })
    return AppUser;
}