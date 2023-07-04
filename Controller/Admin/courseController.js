const db = require('../../Models');
const { Op } = require("sequelize");
const { addAdminCourse } = require("../../Middleware/validation");
const AdminCourse = db.adminCourse;
const AdminCourseContent = db.adminCourseContent;

exports.addCourse = async (req, res) => {
    try {
        // Validate body
        const { error } = addAdminCourse(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload course image!"
            });
        }
        const { category, coursePrice, heading, description, level, language, courseName, lesson, duration, subjects } = req.body;
        await AdminCourse.create({
            category: category,
            courseName: courseName,
            coursePrice: coursePrice,
            language: language,
            lesson: lesson,
            heading: heading,
            description: description,
            level: level,
            duration: duration,
            subjects: subjects,
            courseImage: req.file.path,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Course Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllCourse = async (req, res) => {
    try {
        const course = await AdminCourse.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "course fetched successfully!",
            data: course
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// exports.getCourseById = async (req, res) => {
//     try {
//         const course = await AdminCourse.findOne({
//             where: {
//                 id: req.params.id
//             },
//             include: [{
//                 model: AdminCourseContent,
//                 as: 'courseContent',
//                 order: [
//                     ['createdAt', 'ASC']
//                 ]
//             }]
//         });
//         res.status(200).send({
//             success: true,
//             message: "course fetched successfully!",
//             data: course
//         });
//     } catch (err) {
//         res.status(500).send({
//             success: false,
//             message: err.message
//         });
//     }
// };