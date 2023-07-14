const db = require('../../Models');
const Sequelize = require("sequelize");
const AdminInformation = db.adminInformation;
const Employee = db.employeesInformation;
const { adminLogin, adminRegistration } = require("../../Middleware/validation");
const { JWT_SECRET_KEY, JWT_VALIDITY } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const SALT = 10;

// exports.registerAdmin = async (req, res) => {
//     try {
//         const { error } = adminRegistration(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//         }
//         const isAdmin = await AdminInformation.findOne({
//             where: {
//                 email: req.body.email,
//             },
//         });
//         if (isAdmin) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Admin already present!"
//             });
//         }
//         // generate employee code
//         let code;
//         const isAdminCode = await AdminInformation.findAll({
//             paranoid: false,
//             order: [
//                 ['createdAt', 'ASC']
//             ],
//             // attributes: [
//             //     [Sequelize.fn('DISTINCT', Sequelize.col('employeesCode')) ,'employeesCode']
//             // ]
//         });
//         if (isAdminCode.length == 0) {
//             code = "ADMIN" + 1000;
//         } else {
//             let lastAdminCode = isAdminCode[isAdminCode.length - 1];
//             let lastDigits = lastAdminCode.adminCode.substring(5);
//             let incrementedDigits = parseInt(lastDigits, 10) + 1;
//             code = "ADMIN" + incrementedDigits;
//             //  console.log(code);
//         }
//         const salt = await bcrypt.genSalt(SALT);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         const admin = await AdminInformation.create({
//             ...req.body,
//             password: hashedPassword,
//             adminCode: code
//         });
//         const data = {
//             id: admin.id,
//             email: req.body.email,
//             code: admin.adminCode
//         }
//         const authToken = jwt.sign(
//             data,
//             JWT_SECRET_KEY,
//             { expiresIn: JWT_VALIDITY } // five day
//         );
//         res.status(200).send({
//             success: true,
//             message: 'Register successfully!',
//             authToken: authToken
//         });
//     } catch (err) {
//         res.status(500).send({
//             success: false,
//             message: err.message
//         });
//     }
// };

exports.loginAdmin = async (req, res) => {
    try {
        const { error } = adminLogin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const admin = await AdminInformation.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password!"
            });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            admin.password
        );
        if (!validPassword) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password!"
            });
        }
        const data = {
            id: admin.id,
            email: req.body.email,
            code: admin.adminCode
        }
        const authToken = jwt.sign(
            data,
            JWT_SECRET_KEY,
            { expiresIn: JWT_VALIDITY } // five day
        );
        res.status(200).send({
            success: true,
            message: 'Login successfully!',
            authToken: authToken
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


exports.updateAdminName = async (req, res) => {
    try {
        const admin = await AdminInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }
                ]
            }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "Your Information is not present! Are you register?.. "
            })
        };
        const { name } = req.body;
        await admin.update({
            ...admin,
            name: name
        });
        res.status(200).send({
            success: true,
            message: "Admin updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.getAdmin = async (req, res) => {
    try {
        const admin = await AdminInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }
                ]
            }
        });
        res.status(200).send({
            success: true,
            message: "Admin Profile Fetched successfully!",
            data: admin
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}