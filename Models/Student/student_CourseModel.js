module.exports = (sequelize, DataTypes) => {
    const Student_Course = sequelize.define("student_Course", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        validTill: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
    return Student_Course;
}