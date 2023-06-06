const db = require('../../Models');
const LeadType = db.leadType;
const { Op } = require("sequelize");

exports.addLeadType = async (req, res) => {
    try {
        // Generating leadTypeCode
        let code;
        const type = await LeadType.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (type.length === 0) {
            code = "LTC" + 1000;
        } else {
            let lastLeadTypeCode = type[type.length - 1];
            let lastDigits = lastLeadTypeCode.leadTypeCode.substring(3);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "LTC" + incrementedDigits;
            //  console.log(LRT);
        }
        await LeadType.create({
            leadType: req.body.leadType,
            leadTypeCode: code,
            adminInformationId: req.user.id
        });
        res.status(200).send({
            success: true,
            message: 'Lead type created successfully!'
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getLeadType = async (req, res) => {
    try {
        const type = await LeadType.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: 'Lead type fetched successfully!',
            data: type
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


exports.updateLeadType = async (req, res) => {
    try {
        const type = await LeadType.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!type) {
            return res.status(400).send({
                success: false,
                message: "Lead type is not present!"
            })
        };
        await type.update({
            ...type,
            leadType: req.body.leadType

        });
        res.status(200).send({
            success: true,
            message: "Lead type updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteLeadType = async (req, res) => {
    try {
        const type = await LeadType.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!type) {
            return res.status(400).send({
                success: false,
                message: "Lead type is not present!"
            })
        };
        await type.destroy();
        res.status(200).send({
            success: true,
            message: "Lead type delete successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}