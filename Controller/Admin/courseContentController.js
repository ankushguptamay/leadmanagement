const db = require('../../Models');
const { Op } = require("sequelize");
const { addAdminCourseContent } = require("../../Middleware/validation");
const { deleteSingleFile } = require('../../Util/deleteFile');
const AdminCourseContent = db.adminCourseContent;
const ContentNote = db.contentNotes;
const AppUser_Course = db.appUser_Course;

exports.addCourseContent = async (req, res) => {
    try {
        // Validate body
        const { error } = addAdminCourseContent(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        if (req.files.length < 1) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload atleast one notes!"
            });
        }
        const { videoTitle, videoLink, videoType, course, subject, courseId } = req.body;
        const file = req.files;
        const content = await AdminCourseContent.create({
            videoLink: videoLink,
            videoTitle: videoTitle,
            videoType: videoType,
            subject: subject,
            course: course,
            courseId: courseId,
            createrCode: req.user.code
        });
        for (let i = 0; i < file; i++) {
            await ContentNote.create({
                note_MimeType: file[i].mimetype,
                note_Path: file.path,
                note_Name: file.originalname,
                note_FileName: file.filename,
                courseId: courseId,
                contentId: content.id
            });
        }
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

// for admin
exports.getCourseContentByCourseId = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const content = await AdminCourseContent.findAll({
            where: { courseId: courseId },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Course content fetched successfully!",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for admin
exports.updateCourseContent = async (req, res) => {
    try {
        // Validate body
        const { error } = addAdminCourseContent(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const adminCourseContent = await AdminCourseContent.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!adminCourseContent) {
            return res.status(400).send({
                success: true,
                message: "Course Content is not present!"
            });
        }
        const { videoTitle, videoLink, videoType, subject } = req.body;
        await adminCourseContent.update({
            ...adminCourseContent,
            videoLink: videoLink,
            videoTitle: videoTitle,
            videoType: videoType,
            subject: subject
        });
        res.status(200).send({
            success: true,
            message: "Course Content updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for admin
exports.deleteCourseContent = async (req, res) => {
    try {
        const adminCourseContent = await AdminCourseContent.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!adminCourseContent) {
            return res.status(400).send({
                success: true,
                message: "Course Content is not present!"
            });
        }
        // delete file and note
        const notes = await ContentNote.findAll({
            where: {
                contentId: req.params.id
            }
        });
        if (notes.length > 0) {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].note_Path) {
                    deleteSingleFile(notes[i].note_Path);
                }
                await ContentNote.destroy({
                    where: {
                        id: notes[i].id
                    }
                })
            }
        }
        await adminCourseContent.destroy();
        res.status(200).send({
            success: true,
            message: "Course Content deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for appUser
exports.getCourseContentByContentId = async (req, res) => {
    try {
        const contentId = req.params.id;
        const content = await AdminCourseContent.findOne({
            where: {
                id: contentId
            }
        });
        if (!content) {
            return res.status(400).send({
                success: true,
                message: "Course Content is not present!"
            });
        }
        const courseId = content.courseId;
        const appUserId = req.appUser.id;
        const isCourse = await AppUser_Course.findOne({
            where: {
                courseId: courseId,
                appUserId: appUserId
            }
        });
        if (!isCourse) {
            res.status(400).send({
                success: false,
                message: "You can't access this content! Please purchase this!"
            });
        } else {
            res.status(200).send({
                success: true,
                message: "Course content fetched successfully!",
                data: content
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
