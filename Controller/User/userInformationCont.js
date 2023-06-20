const db = require('../../Models');
const { userRegistration, userLogin, userLoginOTP } = require("../../Middleware/validation");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const UserInformation = db.userInformation;
const EmployeesInformation = db.employeesInformation;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY, JWT_VALIDITY,
    PRAKHAR_TWILIO_PHONE_NUMBER, PRAKHAR_TWILIO_AUTH_TOKEN, PRAKHAR_TWILIO_ACCOUNT_SID } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

const twilioSMS = require("twilio")(PRAKHAR_TWILIO_ACCOUNT_SID, PRAKHAR_TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// Only Admin can register an user
exports.registerUser = async (req, res) => {
    try {
        // Validate body
        const { error } = userRegistration(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is mobile number and Email allready present
        const employees = await EmployeesInformation.findOne({
            where: {
                employeesCode: req.body.employeesCode
            }
        });
        if (!employees) {
            return res.status(400).send({
                success: false,
                message: "Employee with this employees code is not present!"
            });
        }
        const user = await UserInformation.findOne({
            where: {
                userCode: req.body.employeesCode
            }
        });
        if (user) {
            return res.status(400).send({
                success: false,
                message: "User already registered!"
            });
        }
        // check in deleted
        const checkSoftDelete = await UserInformation.findOne({
            where: {
                userCode: req.body.employeesCode
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
        // Creating User Information
        await UserInformation.create({
            name: employees.name,
            email: employees.email,
            phoneNumber: employees.phoneNumber,
            createrCode: req.user.code,
            userCode: req.body.employeesCode
        });
        // message to user
        // twilioSMS.messages
        //     .create({
        //         body: 'You are register as a user. login with same mobile number.',
        //         from: PRAKHAR_TWILIO_PHONE_NUMBER,
        //         statusCallback: 'http://postb.in/1234abcd',
        //         to: `+91${employees.phoneNumber}`
        //     })
        res.status(200).send({
            success: true,
            message: "User Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// Sign In only by Mobile NUmber based
exports.login = async (req, res) => {
    try {
        // Validate body
        const { error } = userLogin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is mobile number present or not
        const { phoneNumber } = req.body;
        const isNumber = await UserInformation.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (!isNumber) {
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
            message: `OTP sent to User's Contact number! vallid till 2 min!`,
            data: { phoneNumber: phoneNumber }
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.verifyLoginOtp = async (req, res) => {
    try {
        // Validate body
        const { error } = userLoginOTP(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { phoneNumber, phoneOTP } = req.body;
        const countryCode = "+91";
        // Checking is mobile number present or not
        const user = await UserInformation.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (!user) {
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
                id: user.id,
                email: user.email,
                code: user.userCode
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

// for user
exports.userInformation = async (req, res) => {
    try {
        const user = await UserInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }, { userCode: req.user.code }
                ]
            }
        });
        res.status(200).send({
            success: true,
            message: "User Information fetched successfully!",
            data: user
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.users = async (req, res) => {
    try {
        const users = await UserInformation.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Users Information fetched successfully!",
            data: users
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await UserInformation.destroy({
            where: {
                userCode: req.params.userCode
            },
            // force: true // If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option

        });
        res.status(200).send({
            success: true,
            message: "User Information deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.restoreUser = async (req, res) => {
    try {
        await UserInformation.restore({
            where: {
                userCode: req.params.userCode
            }
        });
        res.status(200).send({
            success: true,
            message: "User Information restored successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}