const db = require('../../Models');
const { Op } = require("sequelize");
const LeadProfile = db.leadProfile;
const UserInformation = db.userInformation;
const LeadAddress = db.leadAddress;
const LeadContact = db.leadContact;
const LeadOrganisation = db.leadOrganisation;


exports.createLead = async (req, res) => {
    try {
        await LeadProfile.create({
            ...req.body
        });
        res.status(200).send({
            success: true,
            message: "Lead Profile Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// find all lead or by status for admin
exports.getAllLeadByStatus = async (req, res) => {
    try {
        let lead;
        if (req.query.status) {
            lead = await LeadProfile.findAll({
                where: {
                    status: req.query.status
                },
                include: [{
                    model: LeadAddress,
                    as: "address"
                }],
                include: [{
                    model: LeadContact,
                    as: "contact"
                }],
                include: [{
                    model: LeadOrganisation,
                    as: "organisation"
                }]
            });
        } else {
            lead = await LeadProfile.findAll({
                include: [{
                    model: LeadAddress,
                    as: "address"
                }],
                include: [{
                    model: LeadContact,
                    as: "contact"
                }],
                include: [{
                    model: LeadOrganisation,
                    as: "organisation"
                }]
            });
        }
        res.status(200).send({
            success: true,
            message: "Lead Profile fetched successfully!",
            data: lead
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// find all lead for user 
exports.getAllLeadForUser = async (req, res) => {
    try {
        const lead = await UserInformation.findAll({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }
                ]
            },
            include: [{
                model: LeadProfile,
                as: "leads",
                include: [{
                    model: LeadAddress,
                    as: "address"
                }],
                include: [{
                    model: LeadContact,
                    as: "contact"
                }],
                include: [{
                    model: LeadOrganisation,
                    as: "organisation"
                }]
            }]
        })
        res.status(200).send({
            success: true,
            message: "Lead Profile fetched successfully!",
            data: lead
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}