const db = require('../../Models');
const LeadStatus = db.leadStatus;
const { Op } = require("sequelize");

exports.addLeadStatus = async (req, res) => {
    try {
        // Generating leadStatusCode
        let code;
        const status = await LeadStatus.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (status.length === 0) {
            code = "LST" + 1000;
        } else {
            let lastStatusCode = status[status.length - 1];
            let lastDigits = lastStatusCode.leadStatusCode.substring(3);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "LST" + incrementedDigits;
            //  console.log(LST);
        }
        await LeadStatus.create({
            leadStatus: req.body.leadStatus,
            leadStatusCode: code,
            adminInformationId: req.user.id
        });
        res.status(200).send({
            success: true,
            message: 'Lead status created successfully!'
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getLeadStatus = async (req, res) => {
    try {
        const status = await LeadStatus.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: 'Lead status fetched successfully!',
            data: status
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


exports.updateLeadStatus = async (req, res) => {
    try {
        const status = await LeadStatus.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!status) {
            return res.status(400).send({
                success: false,
                message: "Lead status is not present!"
            })
        };
        await status.update({
            ...status,
            leadStatus: req.body.leadStatus

        });
        res.status(200).send({
            success: true,
            message: "Lead status updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteLeadStatus = async (req, res) => {
    try {
        const status = await LeadStatus.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!status) {
            return res.status(400).send({
                success: false,
                message: "Lead status is not present!"
            })
        };
        await status.destroy();
        res.status(200).send({
            success: true,
            message: "Lead status delete successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}