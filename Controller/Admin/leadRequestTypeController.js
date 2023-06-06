const db = require('../../Models');
const LeadRequestType = db.leadRequestType;
const { Op } = require("sequelize");

exports.addLeadRequestType = async (req, res) => {
    try {
        // Generating requestTypeCode
        let code;
        const requestType = await LeadRequestType.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (requestType.length == 0) {
            code = "LRT" + 1000;
        } else {
            let lastRequestTypeCode = requestType[requestType.length - 1];
            let lastDigits = lastRequestTypeCode.requestTypeCode.substring(3);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "LRT" + incrementedDigits;
            //  console.log(LRT);
        }
        await LeadRequestType.create({
            requestType: req.body.requestType,
            requestTypeCode: code,
            adminInformationId: req.user.id
        });
        res.status(200).send({
            success: true,
            message: 'Lead request type created successfully!'
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getLeadRequestType = async (req, res) => {
    try {
        const requestType = await LeadRequestType.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: 'Lead request type fetched successfully!',
            data: requestType
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


exports.updateLeadRequestType = async (req, res) => {
    try {
        const requestType = await LeadRequestType.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!requestType) {
            return res.status(400).send({
                success: false,
                message: "Lead request type is not present!"
            })
        };
        await requestType.update({
            ...requestType,
            requestType: req.body.requestType

        });
        res.status(200).send({
            success: true,
            message: "Lead request type updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteLeadRequestType = async (req, res) => {
    try {
        const requestType = await LeadRequestType.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!requestType) {
            return res.status(400).send({
                success: false,
                message: "Lead request type is not present!"
            })
        };
        await requestType.destroy();
        res.status(200).send({
            success: true,
            message: "Lead request type delete successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}