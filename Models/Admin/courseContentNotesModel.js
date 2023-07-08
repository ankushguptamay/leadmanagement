module.exports = (sequelize, DataTypes) => {
    const CourseContentNotes = sequelize.define("courseContentNote", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        note:{
            type:DataTypes.JSON
        }
    })
    return CourseContentNotes;
}
// foreign id
// courseId
// contentId