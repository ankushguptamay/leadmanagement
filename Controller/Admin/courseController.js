const db = require('../../Models');
const { Op } = require("sequelize");
const { addAdminCourse } = require("../../Middleware/validation");
const { deleteSingleFile } = require("../../Util/deleteFile")
const AdminCourse = db.adminCourse;
const AdminCourseContent = db.adminCourseContent;
const ContentNote = db.contentNotes;

exports.addCourse = async (req, res) => {
    try {
        // Validate body
        const { error } = addAdminCourse(req.body);
        if (error) {
            if (req.files.courseImage) {
                deleteSingleFile(req.files.courseImage[0].path);
            }
            if (req.files.teacherImage) {
                deleteSingleFile(req.files.teacherImage[0].path);
            }
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { category, coursePrice, heading, description, level, language, courseName, duration, introVideoLink, coupen, topic, teacherName } = req.body;
        if (req.files.courseImage && req.files.teacherImage) {
            await AdminCourse.create({
                category: category,
                courseName: courseName,
                coursePrice: coursePrice,
                language: language,
                heading: heading,
                description: description,
                level: level,
                duration: duration,
                coupen: coupen,
                teacherName: teacherName,
                introVideoLink: introVideoLink,
                topic: topic,
                courseImage_Path: req.files.courseImage[0].path,
                courseImage_Name: req.files.courseImage[0].originalname,
                courseImage_FileName: req.files.courseImage[0].filename,
                teacherImage_Path: req.files.teacherImage[0].path,
                teacherImage_Name: req.files.teacherImage[0].originalname,
                teacherImage_FileName: req.files.teacherImage[0].filename,
                createrCode: req.user.code
            });
            res.status(200).send({
                success: true,
                message: "Course Created successfully!"
            });
        } else {
            if (req.files.courseImage) {
                deleteSingleFile(req.files.courseImage[0].path);
            }
            if (req.files.teacherImage) {
                deleteSingleFile(req.files.teacherImage[0].path);
            }
            return res.status(400).send({
                success: false,
                message: "Please..Upload respected images!"
            });
        }
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
            message: "Course fetched successfully!",
            data: course
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await AdminCourse.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: AdminCourseContent,
                as: 'courseContent',
                order: [
                    ['createdAt', 'ASC']
                ]
            }]
        });
        if (!course) {
            return res.status(400).send({
                success: false,
                message: "Course is not present!"
            });
        }
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

exports.updateCourse = async (req, res) => {
    try {
        // Validate body
        const { error } = addAdminCourse(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { category, coursePrice, heading, description, level, language, courseName, duration, introVideoLink, coupen, topic, teacherName } = req.body;
        const course = await AdminCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!course) {
            return res.status(400).send({
                success: false,
                message: "Course is not present!"
            });
        }
        await course.update({
            ...course,
            category: category,
            courseName: courseName,
            coursePrice: coursePrice,
            language: language,
            heading: heading,
            description: description,
            level: level,
            duration: duration,
            coupen: coupen,
            teacherName: teacherName,
            introVideoLink: introVideoLink,
            topic: topic
        })
        res.status(200).send({
            success: true,
            message: "Course updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.updateCourseImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload course image!"
            });
        }
        const course = await AdminCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!course) {
            return res.status(400).send({
                success: false,
                message: "Course is not present!"
            });
        }
        if (course.courseImage_Path) {
            deleteSingleFile(course.courseImage_Path);
        }
        await course.update({
            ...course,
            courseImage_Path: req.file.path,
            courseImage_Name: req.file.originalname,
            courseImage_FileName: req.file.filename
        })
        res.status(200).send({
            success: true,
            message: "Course Image updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.updateTeacherImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload course image!"
            });
        }
        const course = await AdminCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!course) {
            return res.status(400).send({
                success: false,
                message: "Course is not present!"
            });
        }
        if (course.teacherImage_Path) {
            deleteSingleFile(course.teacherImage_Path);
        }
        await course.update({
            ...course,
            teacherImage_Path: req.file.path,
            teacherImage_Name: req.file.originalname,
            teacherImage_FileName: req.file.filename
        })
        res.status(200).send({
            success: true,
            message: "Course Teacher Image updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await AdminCourse.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!course) {
            return res.status(400).send({
                success: false,
                message: "Course is not present!"
            });
        }
        // delete file and note
        const notes = await ContentNote.findAll({
            where: {
                courseId: req.params.id
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
        // delete all content
        const content = await AdminCourseContent.findAll({
            where: {
                courseId: req.params.id
            }
        });
        if (content.length > 0) {
            for (let i = 0; i < content.length; i++) {
                await AdminCourseContent.destroy({
                    where: {
                        id: content[i].id
                    }
                });
            }
        }
        if (course.courseImage_Path) {
            deleteSingleFile(course.courseImage_Path);
        }
        if (course.teacherImage_Path) {
            deleteSingleFile(course.teacherImage_Path);
        }
        await course.destroy()
        res.status(200).send({
            success: true,
            message: "Course deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for appUser
exports.getCourseContentForAppUser = async (req, res) => {
    try {
        const course = await AdminCourse.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: AdminCourseContent,
                as: 'courseContent',
                attributes: ['id', 'course', 'videoTitle', 'createdAt'],
                order: [
                    ['createdAt', 'ASC']
                ]
            }]
        });
        if (!course) {
            return res.status(400).send({
                success: false,
                message: "Course is not present!"
            });
        }
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

//     try {
//         const courseId = req.params.id;
//         const appUserId = req.appUser.id;
//         const isCourse = await AppUser_Course.findOne({
//             where: {
//                 courseId: courseId,
//                 appUserId: appUserId
//             }
//         });
//         if (!isCourse) {
//             res.status(400).send({
//                 success: false,
//                 message: "You can't access this course!"
//             });
//         } else {
//             const course = await AdminCourse.findOne({
//                 where: {
//                     id: req.params.id
//                 },
//                 include: [{
//                     model: AdminCourseContent,
//                     as: 'courseContent',
//                     order: [
//                         ['createdAt', 'ASC']
//                     ]
//                 }]
//             });
//             res.status(200).send({
//                 success: true,
//                 message: "Course content fetched successfully!",
//                 data: course
//             });
//         }
//     } catch (err) {
//         res.status(500).send({
//             success: false,
//             message: err.message
//         });
//     }
// };eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzNjI3OTNlLTE4YTQtNGVhMS1iM2EyLWY4ZTkyYTJkNjZhMCIsImVtYWlsIjoiYW5rdXNoQGdtYWlsLmNvbSIsImNvZGUiOiJBRE1JTjEwMDAiLCJpYXQiOjE2OTUxMDMyNjQsImV4cCI6MTY5NTUzNTI2NH0.PJprSPlOu9Cin-6hYtnMeiCgR0UQI-RgvBGIdCpvaxE