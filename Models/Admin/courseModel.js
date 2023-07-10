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
        heading:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
        },
        level:{
            type: DataTypes.STRING
        },
        language:{
            type: DataTypes.STRING
        },
        courseName:{
            type: DataTypes.STRING
        },
        courseImage:{
            type: DataTypes.TEXT
        },
        duration:{
            type: DataTypes.STRING
        },
        subjects:{
            type: DataTypes.JSON 
        }
    })
    return AdminCourse;
}