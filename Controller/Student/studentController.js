const db = require('../../Models');
const { studentRegistration, studentLogin, studentLoginOTP, courseToStudent } = require("../../Middleware/validation");
const { Op } = require("sequelize");
const Student_Course = db.student_Course;
const Student = db.student;
const AdminCourse = db.adminCourse;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY, JWT_VALIDITY } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// for admin
exports.registerStudent = async (req, res) => {
    try {
        // Validate body
        const { error } = studentRegistration(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is Email allready present
        const { adminCourseId, email, phoneNumber, name, date } = req.body;
        const student = await Student.findOne({ where: { email: email, phoneNumber: phoneNumber } });
        if (student) {
            return res.status(400).send({
                success: false,
                message: "Student already registered!"
            });
        }
        // check in paranoid deleted
        const checkSoftDelete = await Student.findOne({
            where: {
                email: req.body.email
            },
            paranoid: false
        });
        if (checkSoftDelete) {
            return res.status(400).send({
                success: false,
                message: "Student already registered in soft delete! Restore it?",
                data: checkSoftDelete
            });
        }
        // Creating Student Information
        const newStudent = await Student.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            date: date,
            createrCode: req.user.code
        });
        await Student_Course.create({
            createrCode: req.user.code,
            adminCourseId: adminCourseId,
            studentId: newStudent.id
        })
        res.status(200).send({
            success: true,
            message: "Student registered and course assigned successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for student
exports.loginStudent = async (req, res) => {
    try {
        // Validate body
        const { error } = studentLogin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is mobile number present or not
        const { phoneNumber } = req.body;
        const isNumber = await Student.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (!isNumber) {
            return res.status(400).send({
                success: false,
                message: "Student not found! First register your self!"
            });
        }
        // Sending OTP to mobile number
        const countryCode = "+91";
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: `${countryCode}${phoneNumber}`,
                channel: 'sms'
            });
        res.status(200).send({
            success: true,
            message: `OTP sent to Student's Contact number! vallid till 2 min!`,
            data: { phoneNumber: phoneNumber }
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for student
exports.verifyLoginOtp = async (req, res) => {
    try {
        // Validate body
        const { error } = studentLoginOTP(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { phoneNumber, phoneOTP } = req.body;
        const countryCode = "+91";
        // Checking is mobile number present or not
        const student = await Student.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (!student) {
            return res.status(400).send({
                success: false,
                message: "Student not found! First register your self!"
            });
        }
        // verify OTP
        const respond = await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verificationChecks
            .create({
                to: `${countryCode}${phoneNumber}`,
                code: phoneOTP
            });
        if (respond.valid === true) {
            // generating auth Token
            const data = {
                id: student.id,
                email: student.email
            }
            const authToken = jwt.sign(
                data,
                JWT_SECRET_KEY,
                { expiresIn: JWT_VALIDITY } // five day
            );
            res.status(200).send({
                success: true,
                message: `OTP verified successfully!`,
                authToken: authToken
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'Wrong OTP!'
            })
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for student
exports.getStudentForStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                id: req.student.id
            },
            include: [{
                model: AdminCourse,
                as: 'courses'
            }]
        });
        res.status(200).send({
            success: true,
            message: "Student fetched successfully!",
            data: student
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.getStudentForAdminById = async (req, res) => {
    try {
        const student = await Student.findOne({
            paranoid: false,
            where: {
                id: req.params.id
            },
            include: [{
                model: AdminCourse,
                as: 'courses'
            }]
        });
        res.status(200).send({
            success: true,
            message: "Students fetched successfully!",
            data: student
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.getDeletedStudent = async (req, res) => {
    try {
        const student = await Student.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).send({
            success: true,
            message: " Deleted students fetched successfully!",
            data: student
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.searchAndGetActiveStudent = async (req, res) => {
    try {
        const { query } = req.query;
        let student;
        if (query) {
            student = await Student.findAll({
                where: {
                    [Op.or]: [{ name: query }, { email: query }, { phoneNumber: query }]
                },
                order: [
                    ['createdAt', 'DESC'],
                    ["name", "ASC"]
                ]
            });
        } else {
            student = await Student.findAll({
                order: [
                    ['createdAt', 'DESC'],
                    ["name", "ASC"]
                ]
            });
        }
        res.status(200).send({
            success: true,
            message: "Students fetched successfully!",
            data: student
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.deleteStudent = async (req, res) => {
    try {
        await Student.destroy({
            where: {
                id: req.params.id
            },
            // force: true // If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option

        });
        res.status(200).send({
            success: true,
            message: "Student deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.restoreStudent = async (req, res) => {
    try {
        await Student.restore({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            success: true,
            message: "Student restored successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.addSecondCourseToStudent = async (req, res) => {
    try {
        // Validate body
        const { error } = courseToStudent(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { studentId, adminCourseId } = req.body;
        await Student_Course.create({
            createrCode: req.user.code,
            adminCourseId: adminCourseId,
            studentId: studentId
        })
        res.status(200).send({
            success: true,
            message: "Course Assigned to Student successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.removeCourseFromStudent = async (req, res) => {
    try {
        await Student_Course.destroy({
            where: { id: req.params.id }
        })
        res.status(200).send({
            success: true,
            message: "Course Remove from Student successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}
