const db = require('../../Models');
const { appUserRegistration, appUserLoginOTP, appUserLogin, appUserRegistrationByAdmin } = require("../../Middleware/validation");
const { Op } = require("sequelize");
const AppUser_Course = db.appUser_Course;
const AppUser = db.appUser;
const jwt = require("jsonwebtoken");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY, JWT_VALIDITY } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// register for appUser
// getAppUserForAppUser for appUser
// loginAppUser for appUser
// verifyLoginOtp for appUser

// registerAppUser for admin
// getAppUserForAdmin for admin
// getAppUserForAdminById for admin
// getSoftDeletedAppUser for admin
// softDeleteAppUser for admin
// restoreAppUser for admin

exports.register = async (req, res) => {
    try {
        // Validate body
        const { error } = appUserRegistration(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is Email allready present
        const { email, phoneNumber, name } = req.body;
        const appUser = await AppUser.findOne({
            where: {
                email: email,
                phoneNumber: phoneNumber
            }
        });
        if (appUser) {
            return res.status(400).send({
                success: false,
                message: "User already registered!"
            });
        }
        // check in paranoid deleted
        const checkSoftDelete = await AppUser.findOne({
            where: {
                email: req.body.email
            },
            paranoid: false
        });
        if (checkSoftDelete) {
            return res.status(400).send({
                success: false,
                message: "User already registered in soft delete! Restore it?",
                data: checkSoftDelete
            });
        }
        // Creating appUser Information
        const newAppUser = await AppUser.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber
        });
        const data = {
            id: newAppUser.id,
            email: newAppUser.email
        }
        const authToken = jwt.sign(
            data,
            JWT_SECRET_KEY,
            { expiresIn: JWT_VALIDITY } // five day
        );
        res.status(200).send({
            success: true,
            message: "Registered successfully!",
            authToken: authToken
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for admin
exports.registerAppUser = async (req, res) => {
    try {
        // Validate body
        const { error } = appUserRegistrationByAdmin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is Email allready present
        const { adminCourseId, email, phoneNumber, name } = req.body;
        const appUser = await AppUser.findOne({
            where: {
                email: email,
                phoneNumber: phoneNumber
            }
        });
        if (appUser) {
            return res.status(400).send({
                success: false,
                message: "User already registered!"
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
                message: "User already registered in soft delete! Restore it?",
                data: checkSoftDelete
            });
        }
        // Creating Student Information
        const newAppUser = await AppUser.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            createrCode: req.user.code
        });
        await AppUser_Course.create({
            createrCode: req.user.code,
            courseId: adminCourseId,
            appUserId: newAppUser.id
        });
        const data = {
            id: newAppUser.id,
            email: newAppUser.email
        }
        const authToken = jwt.sign(
            data,
            JWT_SECRET_KEY,
            { expiresIn: JWT_VALIDITY } // five day
        );
        res.status(200).send({
            success: true,
            message: "User registered and course assigned successfully!",
            authToken: authToken
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.loginAppUser = async (req, res) => {
    try {
        // Validate body
        const { error } = appUserLogin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is mobile number present or not
        const { phoneNumber } = req.body;
        const isAppUser = await AppUser.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (!isAppUser) {
            return res.status(400).send({
                success: false,
                message: "User not found! First register your self!"
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
            message: `OTP sent to registerd Contact number! vallid till 2 min!`,
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
        const { error } = appUserLoginOTP(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { phoneNumber, phoneOTP } = req.body;
        const countryCode = "+91";
        // Checking is mobile number present or not
        const appUser = await AppUser.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (!appUser) {
            return res.status(400).send({
                success: false,
                message: "User not found! First register your self!"
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
                id: appUser.id,
                email: appUser.email
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

exports.getAppUserForAppUser = async (req, res) => {
    try {
        const appUser = await AppUser.findOne({
            where: {
                id: req.appUser.id
            }
        });
        res.status(200).send({
            success: true,
            message: "User fetched successfully!",
            data: appUser
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.getAppUserForAdmin = async (req, res) => {
    try {
        const appUser = await AppUser.findAll();
        res.status(200).send({
            success: true,
            message: "App Users fetched successfully!",
            data: appUser
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.getAppUserForAdminById = async (req, res) => {
    try {
        const student = await AppUser.findOne({
            paranoid: false,
            where: {
                id: req.params.id
            }
        });
        if (!student) {
            return res.status(400).send({
                success: false,
                message: "User not found!"
            });
        }
        res.status(200).send({
            success: true,
            message: "App user fetched successfully!",
            data: student
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.getSoftDeletedAppUser = async (req, res) => {
    try {
        const student = await AppUser.findAll({
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
            message: "All Soft Deleted students fetched successfully!",
            data: student
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.softDeleteAppUser = async (req, res) => {
    try {
        const appUser = await AppUser.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!appUser) {
            return res.status(400).send({
                success: false,
                message: "App User is not found!"
            });
        }
        await appUser.destroy({
            // force: true // If you really want a hard-delete and your model is paranoid, you can force it using the force: true option
        });
        res.status(200).send({
            success: true,
            message: "App user soft deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.restoreAppUser = async (req, res) => {
    try {
        const appUser = await AppUser.findOne({
            paranoid: false,
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.ne]: null
                }
            }
        });
        if (!appUser) {
            return res.status(400).send({
                success: false,
                message: "This App User is not found in soft delete!"
            });
        }
        await appUser.restore();
        res.status(200).send({
            success: true,
            message: "App user restored successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}