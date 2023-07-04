const db = require('../../../Models');
const { Op } = require("sequelize");
const Level = db.level;

exports.addLevel = async (req, res) => {
    try {
        const { level } = req.body;
        if (!level) {
            return res.status(400).send({
                success: false,
                message: "Level can't be blank!"
            });
        }
        let code;
        const isLevelCode = await Level.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isLevelCode.length == 0) {
            code = "LEVEL" + 1000;
        } else {
            let lastLevelCode = isLevelCode[isLevelCode.length - 1];
            let lastDigits = lastLevelCode.levelCode.substring(5);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "LEVEL" + incrementedDigits;
            //  console.log(code);
        }
        await Level.create({
            level: level,
            levelCode: code,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Level Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllLevel = async (req, res) => {
    try {
        const level = await Level.findAll({
            order: [
                ['level', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Level fetched successfully!",
            data: level
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteLevel = async (req, res) => {
    try {
        const level = await Level.findOne({
            where: {
                levelCode: req.params.levelCode
            }
        });
        if (!level) {
            return res.status(400).send({
                success: false,
                message: "Level is not present!"
            });
        }
        await level.destroy();
        res.status(200).send({
            success: true,
            message: "Level deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}