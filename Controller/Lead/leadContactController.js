const db = require('../../Models');
const { Op } = require("sequelize");
const LeadContact = db.leadContact;

exports.createLeadContact = async (req, res) => {
    try {
        await LeadContact.create({
            ...req.body,
            createrId: req.user.id,
            leadProfileId: req.body.leadProfileId
        });
        res.status(200).send({
            success: true,
            message: "Lead Contact Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.updateLeadContact = async (req, res) => {
    try {
        const leadContact = await LeadContact.findOne({
            where: { id: req.params.id }
        });
        if (!leadContact) {
            return res.status(400).send({
                success: false,
                message: "Lead Contact is not present!"
            })
        };
        const { website, email, phoneNumber, whatsAppNumber } = req.body;
        await leadContact.update({
            ...leadContact,
            createrId: req.user.id,
            website: website,
            email: email,
            phoneNumber: phoneNumber,
            whatsAppNumber: whatsAppNumber
        });
        res.status(200).send({
            success: true,
            message: "Lead Contact updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
