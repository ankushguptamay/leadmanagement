const db = require('../../Models');
const { appUserRegistration, appUserLoginOTP, appUserLogin } = require("../../Middleware/validation");
const { Op } = require("sequelize");
const AppUser = db.appUser;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY, JWT_VALIDITY } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// for admin
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
        const appUser = await AppUser.findOne({ where: { email: email, phoneNumber: phoneNumber } });
        if (appUser) {
            return res.status(400).send({
                success: false,
                message: "User already registered!"
            });
        }
        // Creating appUser Information
        await AppUser.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber
        });
        res.status(200).send({
            success: true,
            message: "Registered successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for student
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

// for student
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

// for admin
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