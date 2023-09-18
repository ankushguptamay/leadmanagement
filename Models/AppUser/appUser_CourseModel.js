module.exports = (sequelize, DataTypes) => {
    const AppUser_Course = sequelize.define("appUser_Course", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        validTill: {
            type: DataTypes.STRING
        },
        createrCode: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
    return AppUser_Course;
}
// studentId
// adminCourseId