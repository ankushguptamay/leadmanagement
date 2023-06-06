const db = require('../../Models');
const { userRegistration, userLogin, userLoginOTP } = require("../../Middleware/Validation/userValidation");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const UserInformation = db.userInformation;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY, JWT_VALIDITY } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// Only Admin can register an user
exports.registerUser = async (req, res) => {
    try {
        // Validate body
        // const { error } = userRegistration(req.body);
        // if (error) {
        //     console.log(error);
        //     return res.status(400).send(error.details[0].message);
        // }
        // Checking is mobile number and Email allready present
        const user = await UserInformation.findOne({
            where: {
                [Op.or]: [
                    { phoneNumber: req.body.phoneNumber }, { email: req.body.email }
                ]
            }
        });
        if (user) {
            return res.status(400).send({
                success: false,
                message: "User already registered!"
            });
        }
        // Creating User Information
        await UserInformation.create({
            ...req.body
        });
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
        // const { error } = userLogin(req.body);
        // if (error) {
        //     console.log(error);
        //     return res.status(400).send(error.details[0].message);
        // }
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
            message: `OTP sent to User's Contact number! vallid till 2 min!`
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
        // const { error } = userLoginOTP(req.body);
        // if (error) {
        //     console.log(error);
        //     return res.status(400).send(error.details[0].message);
        // }
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
                position: user.position
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
                    { id: req.user.id }, { email: req.user.email }
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