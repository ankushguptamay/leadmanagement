const db = require('../../Models');
const { Op } = require("sequelize");
const { addAdminCourseContent } = require("../../Middleware/validation");
const AdminCourseContent = db.adminCourseContent;

exports.addCourseContent= async (req, res) => {
    try {
        // Validate body
        const { error } = addAdminCourseContent(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        if (!req.files) {
            return res.status(400).send({
                success: false,
                message: `You must select at least 1 File.`
            });
        }
        const notes = (req.files).map((file => { return file.path }));
        const { videoTitle, videoLink, videoType, course, subject } = req.body;
        await AdminCourseContent.create({
            videoLink: videoLink,
            videoTitle: videoTitle,
            videoType: videoType,
            subject: subject,
            course: course,
            contentNotes: notes,
            courseId: req.params.courseId,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Course Content Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};