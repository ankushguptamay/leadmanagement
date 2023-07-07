const db = require('../Models');
const AdminInformation = db.adminInformation;
const UserInformation = db.userInformation;
const Student = db.student;
const AppUser = db.appUser;
const { Op } = require("sequelize");

exports.isAdminPresent = async (req, res, next) => {
    try {
        const admin = await AdminInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }, { adminCode: req.user.code }
                ]
            }
        });
        if (!admin) {
            return res.send({
                message: "Admin is not present! Are you register?.. "
            })
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// Routes which are accessible for all user
exports.isUserPresentAll = async (req, res, next) => {
    try {
        const user = await UserInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }, { userCode: req.user.code }
                ]
            }
        });
        if (!user) {
            return res.send({
                message: "User is not present! Are you register?.. "
            })
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.isStudentPresent = async (req, res, next) => {
    try {
        const student = await Student.findOne({
            where: {
                [Op.and]: [
                    { id: req.student.id }, { email: req.student.email }
                ]
            }
        });
        if (!student) {
            return res.send({
                message: "Student is not present! Are you register?.. "
            })
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.isAppUserPresent = async (req, res, next) => {
    try {
        const appUser = await AppUser.findOne({
            where: {
                [Op.and]: [
                    { id: req.appUser.id }, { email: req.appUser.email }
                ]
            }
        });
        if (!appUser) {
            return res.send({
                message: "User is not present! Are you register?.. "
            })
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}