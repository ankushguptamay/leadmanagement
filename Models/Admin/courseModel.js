module.exports = (sequelize, DataTypes) => {
    const AdminCourse = sequelize.define("adminCourse", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING
        },
        coursePrice: {
            type: DataTypes.STRING
        },
        heading: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.STRING
        },
        language: {
            type: DataTypes.STRING
        },
        courseName: {
            type: DataTypes.STRING
        },
        courseImage_Path: {
            type: DataTypes.STRING(1234)
        },
        courseImage_Name: {
            type: DataTypes.STRING(1234)
        },
        courseImage_FileName: {
            type: DataTypes.STRING(1234)
        },
        duration: {
            type: DataTypes.STRING
        },
        topic: {
            type: DataTypes.JSON
        },
        teacherName: {
            type: DataTypes.STRING
        },
        teacherImage_Path: {
            type: DataTypes.STRING(1234)
        },
        teacherImage_Name: {
            type: DataTypes.STRING(1234)
        },
        teacherImage_FileName: {
            type: DataTypes.STRING(1234)
        },
        coupen: {
            type: DataTypes.STRING
        },
        introVideoLink: {
            type: DataTypes.STRING
        }
    })
    return AdminCourse;
}