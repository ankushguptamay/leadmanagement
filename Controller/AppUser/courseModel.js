const db = require('../../Models');
const { Op } = require("sequelize");
const AppUser_Course = db.appUser_Course;
const AdminCourse = db.adminCourse;
const { courseToAppUser } = require('../../Middleware/validation');

// getAssignCourse for appUser
// addSecondCourseToAppUser for admin
// removeCourseFromAppUser for admin
// purchaseCourse for appUser

exports.getAssignCourse = async (req, res) => {
    try {
        const course = await AppUser_Course.findAll({
            where: {
                appUserId: req.appUser.id
            },
            include: [{
                model: AdminCourse,
                as: 'course'
            }]
        });
        res.status(200).send({
            success: true,
            message: "App user's course fetched successfully!",
            data: course
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.addSecondCourseToAppUser = async (req, res) => {
    try {
        // Validate body
        const { error } = courseToAppUser(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { courseId, appUserId } = req.body;
        await AppUser_Course.create({
            createrCode: req.user.code,
            courseId: courseId,
            appUserId: appUserId
        });
        res.status(200).send({
            success: true,
            message: "Course Assigned to App User successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// soft remove
exports.removeCourseFromAppUser = async (req, res) => {
    try {
        await AppUser_Course.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            success: true,
            message: "Course Remove from App User successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.purchaseCourse = async (req, res) => {
    try {
        await AppUser_Course.create({
            createrCode: req.user.code,
            courseId: courseId,
            appUserId: req.appUser.id
        });
        res.status(200).send({
            success: true,
            message: "Course Assigned to App User successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}