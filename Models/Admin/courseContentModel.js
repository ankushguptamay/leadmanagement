module.exports = (sequelize, DataTypes) => {
    const AdminCourseContent = sequelize.define("adminCourseContent", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        course: {
            type: DataTypes.STRING
        },
        videoTitle: {
            type: DataTypes.STRING
        },
        videoLink:{
            type:DataTypes.TEXT
        },
        videoType:{
            type:DataTypes.STRING
        }
    })
    return AdminCourseContent;
}