const db = require('../../../Models');
const { Op } = require("sequelize");
const Medium = db.medium;

exports.addMedium = async (req, res) => {
    try {
        const { medium } = req.body;
        if (!medium) {
            return res.status(400).send({
                success: false,
                message: "Medium can't be blank!"
            });
        }
        let code;
        const isMediumCode = await Medium.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isMediumCode.length == 0) {
            code = "MEDIUM" + 1000;
        } else {
            let lastMediumCode = isMediumCode[isMediumCode.length - 1];
            let lastDigits = lastMediumCode.mediumCode.substring(6);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "MEDIUM" + incrementedDigits;
            //  console.log(code);
        }
        await Medium.create({
            medium: medium,
            mediumCode: code,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Medium Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllMedium = async (req, res) => {
    try {
        const medium = await Medium.findAll({
            order: [
                ['medium', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Medium fetched successfully!",
            data: medium
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteMedium = async (req, res) => {
    try {
        const medium = await Medium.findOne({
            where: {
                mediumCode: req.params.mediumCode
            }
        });
        if (!medium) {
            return res.status(400).send({
                success: false,
                message: "Medium is not present!"
            });
        }
        await medium.destroy();
        res.status(200).send({
            success: true,
            message: "Medium deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}