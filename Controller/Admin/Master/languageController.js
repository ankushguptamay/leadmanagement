const db = require('../../../Models');
const { Op } = require("sequelize");
const Language = db.language;

exports.addLanguage = async (req, res) => {
    try {
        const { language } = req.body;
        if (!language) {
            return res.status(400).send({
                success: false,
                message: "Language can't be blank!"
            });
        }
        let code;
        const isLanguageCode = await Language.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isLanguageCode.length == 0) {
            code = "LANGUAGE" + 1000;
        } else {
            let lastLanguageCode = isLanguageCode[isLanguageCode.length - 1];
            let lastDigits = lastLanguageCode.languageCode.substring(8);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "LANGUAGE" + incrementedDigits;
            //  console.log(code);
        }
        await Language.create({
            language: language,
            languageCode: code,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Language Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllLanguage = async (req, res) => {
    try {
        const language = await Language.findAll({
            order: [
                ['language', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Language fetched successfully!",
            data: language
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteLanguage = async (req, res) => {
    try {
        const language = await Language.findOne({
            where: {
                languageCode: req.params.languageCode
            }
        });
        if (!language) {
            return res.status(400).send({
                success: false,
                message: "Language is not present!"
            });
        }
        await language.destroy();
        res.status(200).send({
            success: true,
            message: "Language deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}
